import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const body = await req.json();
    const { booking } = body;

    if (!booking) {
      return NextResponse.json({ error: 'Booking details required' }, { status: 400 });
    }

    const { clientName, email, phone, date, time, service, notes } = booking;
    const dateParts = (date || '2026-08-01').split('-').map((v: string) => parseInt(v, 10));

    let hour = 9;
    let minute = 0;
    if (time) {
      const match = time.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (match) {
        hour = parseInt(match[1], 10);
        minute = parseInt(match[2], 10);
        const period = match[3]?.toUpperCase();
        if (period === 'PM' && hour < 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;
      }
    }

    let durationMinutes = 30;
    if (service && service.toLowerCase().includes('45')) durationMinutes = 45;
    if (service && service.toLowerCase().includes('60')) durationMinutes = 60;

    const startDateTime = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hour, minute).toISOString();
    const endDateTime = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hour, minute + durationMinutes).toISOString();

    const calendarEvent = {
      summary: `${service || 'Consultation Call'} - ${clientName}`,
      description: `Client Name: ${clientName}\nEmail: ${email || 'N/A'}\nPhone: ${phone || 'N/A'}\nNotes: ${notes || 'N/A'}`,
      start: { dateTime: startDateTime, timeZone: 'UTC' },
      end: { dateTime: endDateTime, timeZone: 'UTC' },
      attendees: email ? [{ email, displayName: clientName }] : undefined,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    // If an OAuth access token is passed in header
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const googleRes = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(calendarEvent),
      });

      if (googleRes.ok) {
        const eventData = await googleRes.json();
        return NextResponse.json({
          success: true,
          syncedToGoogle: true,
          eventId: eventData.id,
          htmlLink: eventData.htmlLink,
          message: 'Appointment synced directly to primary Google Calendar!',
        });
      } else {
        const errText = await googleRes.text();
        console.warn('Google Calendar API returned non-200:', errText);
      }
    }

    // Fallback URL generation if token is not available or API call fails
    const startIso = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2], hour, minute))
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, '');
    const endIso = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2], hour, minute + durationMinutes))
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, '');

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${service || 'Strategy Call'} - ${clientName}`)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(`Client: ${clientName}\nNotes: ${notes || ''}`)}`;

    return NextResponse.json({
      success: true,
      syncedToGoogle: false,
      googleCalendarUrl,
      message: 'Calendar sync event generated.',
    });
  } catch (error: any) {
    console.error('Calendar sync route error:', error);
    return NextResponse.json({ error: error.message || 'Failed to sync calendar' }, { status: 500 });
  }
}
