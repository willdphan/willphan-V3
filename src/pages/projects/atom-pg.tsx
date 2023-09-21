import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout, { projectClasses } from 'src/pages/projects/layout'
import '@mantine/code-highlight/styles.css'
import { CodeHighlight } from '@mantine/code-highlight'
import { Code } from '@mantine/core'
import { CodeHighlightTabs } from '@mantine/code-highlight'

const Project = () => {
	const home = `
export default function Home() {
    const introText =
        "Hello, I'm ATOM, your AI executive assistant. How can I help you today?";
    const [displayedMessage, setDisplayedMessage] = useState(introText);
    const [loading, setLoading] = useState(false);
    const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
    
    useEffect(() => {
        const fetchAndUpdateTranscript = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/listen?timestamp=$[lastUpdateTime]');
            const text = await response.text();
            console.log("Transcript:", text);
    
            if (!text) {
            setLoading(false);
            setTimeout(fetchAndUpdateTranscript, 1000);
            return;
            }
    
            const lines = text.split("\n");
    
            let messages = "";
    
            for (let i = 0; i < lines.length; i += 3) {
            messages += lines.slice(i, i + 3).join("\n") + "\n";
            }
    
            if (messages !== "") {
            setDisplayedMessage(messages);
            setLastUpdateTime(Date.now());
            }
        } catch (err) {
            console.error(err);
        }
    
        setLoading(false);
        setTimeout(fetchAndUpdateTranscript, 1000);
        };
    
        const clearTranscript = async () => {
        await fetch("/api/clearTranscript");
        };
    
        clearTranscript();
        fetchAndUpdateTranscript();
    }, []);
    `
	const fetchdisplay = `
    useEffect(() => {
        const fetchAndUpdateTranscript = async () => {
          setLoading(true);
          try {
            const response = await fetch('/api/listen?timestamp=$[lastUpdateTime]');
            const text = await response.text();
            console.log("Transcript:", text);
    
            if (!text) {
              setLoading(false);
              setTimeout(fetchAndUpdateTranscript, 1000);
              return;
            }
    
            const lines = text.split("\n");
    
            let messages = "";
    
            for (let i = 0; i < lines.length; i += 3) {
              messages += lines.slice(i, i + 3).join("\n") + "\n";
            }
    
            if (messages !== "") {
              setDisplayedMessage(messages);
              setLastUpdateTime(Date.now());
            }
          } catch (err) {
            console.error(err);
          }
    
          setLoading(false);
          setTimeout(fetchAndUpdateTranscript, 1000);
        };
    `
	const email = `
def announce_unread_emails():
    unread_emails = list_unread_emails()
    count = len(unread_emails)
    return f"You have {count} unread emails."

def create_draft_email(subject, body, to):
    creds = get_credentials()
    service = build('gmail', 'v1', credentials=creds)
    message = {
        'subject': subject,
        'body': body,
        'to': to
    }
    create_message = {'message': {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}}
    draft = service.users().drafts().create(userId='me', body=create_message).execute()
    return draft
    `
	const sms = `
def send_sms(sms_text, recipient_phone_number):
    print(f"Sending SMS to {recipient_phone_number} with content: {sms_text}")
    message = twilio_client.messages.create(
        body=sms_text,
        from_=config.TWILIO_PHONE_NUMBER,
        to=recipient_phone_number,
    )
    print(f"SMS sent to {recipient_phone_number}. Message SID: {message.sid}")
    `
	const voice = `
    from elevenlabslib import ElevenLabsUser
    api_key = config.ELEVEN_LABS_API_KEY
    user = ElevenLabsUser(api_key)
    
    # Generate and play audio response
    voice = user.get_voices_by_name("Antoni")[0]
    audio = voice.generate_audio_bytes(system_message)
    
    audio = AudioSegment.from_file(io.BytesIO(audio), format="mp3")
    audio.export("output.wav", format="wav")
    
    wave_obj = sa.WaveObject.from_wave_file("output.wav")
    play_obj = wave_obj.play()
    play_obj.wait_done()
    `
	const screen = `
    from screen_capture import analyze_screen, analyze_screen_and_respond

    # Analyze screen and respond
    analyze_screen_and_respond()
    
    # Analyze screen
    analyze_screen()
    `
	const search = `
    from search import search_google

    # Search Google
    search_results = search_google(query)
    
    # Summarize results using GPT-3
    gpt_prompt = f"Please provide a brief summary of the top search results for '{query}':\n\n"
    summary = gpt3_query(gpt_prompt)
    `
	const calendar = `
    from google_cal import create_event, delete_event, find_event, get_events, parse_calendar_event_details, play_ask_event_title

    # Create an event
    create_event(start_time, end_time, summary, attendees=None)
    
    # Delete an event
    delete_event(event_id)
    
    # Find an event
    find_event(event_id)
    
    # List events
    get_events()
    `
	const document = `
    from google_docs import create_google_doc, play_ask_doc_title

    # Create a Google Doc
    create_google_doc(title, initial_text)
    
    # Edit a Google Doc
    edit_google_doc(document_id, text)
    `

	const router = useRouter()
	const { projectName } = router.query

	const publicationDate = 'April, 2023'

	return (
		<Layout projectName={projectName as string} publicationDate={publicationDate}>
			<div className={`${projectClasses.content}`}>
				ATOM is a Next.js application that serves as an AI executive assistant. It fetches and displays messages
				from an API, and provides a user-friendly interface for interaction.
			</div>

			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/atom-display.mov" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<br />
			<h2 id="Fetching & Displaying Data" className={`${projectClasses.subheading}`}>
				Fetching & Displaying Data
			</h2>

			<div className={`${projectClasses.content}`}>
				The application fetches data from the API in the <Code>fetchAndUpdateTranscript</Code> function inside
				the Home component. It makes a <Code>GET</Code> request to the <Code>/api/listen</Code> endpoint with
				the <Code>lastUpdateTime</Code> as a parameter. The fetched data is then stored in the{' '}
				<Code>displayedMessage</Code> state variable.
			</div>

			<br />
			<CodeHighlightTabs
				withExpandButton
				defaultExpanded={false}
				expandCodeLabel="Show full code"
				collapseCodeLabel="Show less"
				code={[{ fileName: 'index.tsx', code: 'fetchdisplay', language: 'tsx' }]}
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />
			<div className={`${projectClasses.content}`}>
				<div>
					ATOM is an AI executive assistant that provides a variety of services by integrating with various
					APIs and libraries. The key capabilities are listed below.
				</div>
			</div>

			<br />
			<h2 id="Voice Interaction" className={`${projectClasses.subheading}`}>
				Voice Interaction
			</h2>
			<div className={`${projectClasses.content}`}>
				ATOM uses the ElevenLabs library to generate voice responses. It listens to user commands, transcribes
				them, and generates appropriate responses. The transcription is done using the{' '}
				<Code>speech_recognition</Code> library, and the responses are generated using the ElevenLabsUser class
				from the ElevenLabs library. The responses are then converted to audio using the pydub library and
				played back to the user.
			</div>

			<br />

			<CodeHighlight
				code={`${voice}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />
			<h2 id="Email Management" className={`${projectClasses.subheading}`}>
				Email Management
			</h2>
			<div className={`${projectClasses.content}`}>
				ATOM uses the Gmail API to interact with the user&apos;s Gmail account. It can list unread emails in the
				user&apos;s inbox and create draft emails with a specified subject, body, and recipient. The
				<Code>announce_unread_emails</Code> function fetches the list of unread emails and returns a message
				with the count of unread emails. The <Code>create_draft_email</Code> function creates a draft email with
				the specified subject, body, and recipient.
			</div>

			<br />

			<h2 id="Calendar Management" className={`${projectClasses.subheading}`}>
				Calendar Management
			</h2>
			<div className={`${projectClasses.content}`}>
				ATOM uses the Google Calendar API to manage the user&apos;s calendar events. It can create events with a
				specified start time, end time, summary, and attendees using the <Code>create_event</Code> function. It
				can delete events with a specified event ID using the <Code>delete_event</Code> function. It can find an
				event with a specified event ID using the <Code>find_event</Code> function. It can list all events for
				the current day using the <Code>get_events</Code> function.
			</div>

			<br />

			<CodeHighlight
				code={`${calendar}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/atom-calendar.mov" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<br />

			<h2 id="Document Management" className={`${projectClasses.subheading}`}>
				Document Management
			</h2>
			<div className={`${projectClasses.content}`}>
				ATOM uses the Google Docs API to manage Google Docs. It can create a new Google Doc with a specified
				title and initial text using the <Code>create_google_doc</Code> function. It can edit a Google Doc with
				a specified document ID and text using the <Code>edit_google_doc</Code> function.
			</div>

			<br />

			<CodeHighlight
				code={`${document}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/atom-document.mov" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<br />
			<h2 id="Screen Analysis" className={`${projectClasses.subheading}`}>
				Screen Analysis
			</h2>
			<div className={`${projectClasses.content}`}>
				ATOM uses the Azure Computer Vision API to analyze the user&apos;s screen. It captures the screen using
				the ImageGrab library, converts the image to the OpenCV format, and sends it to the Azure Computer
				Vision API for analysis. The <Code>analyze_screen_and_respond</Code> function captures the screen,
				analyzes it, generates a response using GPT-3, and plays back the response to the user.
			</div>

			<br />

			<CodeHighlight
				code={`${screen}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />
			<h2 id="Web Search" className={`${projectClasses.subheading}`}>
				Web Search
			</h2>
			<div className={`${projectClasses.content}`}>
				ATOM uses the Google Custom Search API to perform web searches. It sends a GET request to the Google
				Custom Search API with the user&apos;s query and receives a list of search results. It then uses
				OpenAI&apos;s GPT-3 to generate a summary of the top search results. The <Code>search_google</Code>{' '}
				function performs the web search, and the <Code>gpt3_query</Code> function generates the summary.
			</div>

			<br />

			<CodeHighlight
				code={`${search}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/atom-search.mov" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<br />
			<h2 id="SMS Sending" className={`${projectClasses.subheading}`}>
				SMS Sending
			</h2>
			<div className={`${projectClasses.content}`}>
				ATOM uses the Twilio API to send SMS messages. It can send an SMS to a specified recipient with a
				specified message. The <Code>send_sms</Code> function is used to send the SMS. It takes the text of the
				SMS and the recipient&apos;s phone number as arguments. The function uses the{' '}
				<Code>twilio_client.messages.create</Code> method to create and send the SMS. The status of the SMS is
				then printed to the console.
			</div>

			<br />

			<CodeHighlight
				code={`${sms}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
		</Layout>
	)
}

export default Project
