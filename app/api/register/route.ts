import { createClient } from '@/lib/supabase/server'
import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

// Email transporter configuration using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

interface RegistrationData {
  program?: string
  session?: string
  dates?: string
  total?: string
  discount?: boolean
  skater_info: Record<string, string>[]
  guardian_info?: Record<string, string>
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Prepare data for storage
    const registrationData: RegistrationData = {
      program: body.program,
      session: body.session,
      dates: body.dates,
      total: body.total,
      discount: body.discount || false,
      skater_info: body.skaters || [],
      guardian_info: body.guardian || undefined,
    }

    // Save to Supabase
    let supabaseData = null
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('registrations')
        .insert([
          {
            program: registrationData.program,
            session: registrationData.session,
            dates: registrationData.dates,
            total: registrationData.total,
            is_discount: registrationData.discount,
            skater_info: registrationData.skater_info,
            guardian_info: registrationData.guardian_info,
          },
        ])
        .select()

      if (error) {
        console.error('Supabase error:', error)
      } else {
        supabaseData = data
      }
    } catch (dbError) {
      console.error('Database connection error:', dbError)
    }

    // Build program summary for email
    const programSummary = [
      registrationData.program,
      registrationData.session,
      registrationData.dates,
    ]
      .filter(Boolean)
      .join(' ')

    // Build skater details for email
    const skaterDetails = registrationData.skater_info
      .map((skater, idx) => {
        const num = idx + 1
        return `
Skater ${num}:
  First Name: ${skater.first_name || 'N/A'}
  Last Name: ${skater.last_name || 'N/A'}
  Date of Birth: ${skater.dob || 'N/A'}
  Gender: ${skater.gender || 'N/A'}
  Current Skill Level: ${skater.skill_level || 'N/A'}`
      })
      .join('\n')

    // Build guardian details for email (if not adult program)
    const guardianDetails =
      registrationData.guardian_info &&
      Object.keys(registrationData.guardian_info).length > 0
        ? `
Parent/Guardian Information:
  First Name: ${registrationData.guardian_info.first_name || 'N/A'}
  Last Name: ${registrationData.guardian_info.last_name || 'N/A'}
  Email: ${registrationData.guardian_info.email || 'N/A'}
  Phone: ${registrationData.guardian_info.phone || 'N/A'}
  Relationship: ${registrationData.guardian_info.relationship || 'N/A'}`
        : ''

    // Send email
    const emailContent = `
New Registration Received

Program: ${programSummary}
Total: ${registrationData.total || 'N/A'}
${registrationData.discount ? 'Discount Applied: Yes' : ''}

${skaterDetails}
${guardianDetails}

---
This registration has been saved to the database.
`

    try {
      console.log('[v0] Email credentials check:', {
        user: process.env.GMAIL_USER ? 'set' : 'NOT SET',
        pass: process.env.GMAIL_PASSWORD ? 'set' : 'NOT SET',
      })
      const info = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: 'iceworksskatingacademy@gmail.com',
        subject: `New Registration: ${registrationData.program}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br>'),
      })
      console.log('[v0] Email sent successfully:', info.messageId)
    } catch (emailError) {
      console.error('[v0] Email sending error:', emailError)
      // Don't fail the registration if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration submitted successfully',
        data: supabaseData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to process registration', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
