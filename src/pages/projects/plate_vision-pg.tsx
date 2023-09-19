// pages/projects/degen.tsx
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout, { projectClasses } from 'src/pages/projects/layout'
import '@mantine/code-highlight/styles.css'
import { CodeHighlight } from '@mantine/code-highlight'
import { CodeHighlightTabs } from '@mantine/code-highlight'
import { Code } from '@mantine/core'
import Image from 'next/image'
import { Paper } from '@mantine/core'

const Project = () => {
	const structure = `
	/api
	├── api.py
	├── lp.py
	├── realTime_lp.py
	├── upload_lp.py
	├── util.py
	├── sort
	│   ├── sort.py
	│   └── ...
	├── utils
	│   ├── visualize.py
	│   ├── add_missing_data.py
	│   └── ...
	└── ...
	`
	const flow = `
	# load model
	coco_model = YOLO('yolov8n.pt')
	rf = Roboflow(api_key=os.getenv('API_KEY'))
	project = rf.workspace().project("license-plate-recognition-rxg4e")
	license_plate_detector = project.version(4).model
	`

	{
		/* <CodeHighlight
code={`// Custom copy label${exampleCode}`}
language="tsx"
copyLabel="Copy button code"
copiedLabel="Copied!"
className={`${projectClasses.code}`}
/> */
	}

	{
		/* <Code block>{codeForPreviousDemo}</Code> */
	}

	const router = useRouter()
	const { projectName } = router.query

	const publicationDate = 'September, 2023'

	return (
		<Layout projectName={projectName as string} publicationDate={publicationDate}>
			<div>
				Plate Vision comprises a real-time license plate recognition system that uses YOLO for vehicle
				detection, Roboflow for license plate identification, and EasyOCR for text reading. SORT tracks vehicles
				across video frames. The architecture offers API endpoints for video uploads, real-time recognition
				control, and streaming. It employs multithreading for concurrent video and API handling, streams
				processed frames to clients, and manages file storage and output in CSV format.
			</div>

			<h2 id="hello" className={`${projectClasses.subheading}`}>
				Structure
			</h2>

			<div className={`${projectClasses.content}`}>
				The api directory houses the backend Flask app, including various Python scripts for routes and
				features. It has its own requirements.txt and a sort subdirectory for the SORT algorithm.
				<br />
				Inside the folder api/sort, the SORT algorithm is implemented, with its own requirements.txt and a GNU
				License file.
				<br />
				The tech stack includes Next.js for the frontend and Flask for the backend, integrated under /api/. The
				backend leverages libraries for tasks like object detection and license plate recognition. It looks
				something like this.
			</div>
			<CodeHighlight
				code={`// structure${structure}`}
				language="tsx"
				copyLabel="Copy button code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<div className={`${projectClasses.content}`}>
				The api folder is part of a larger project that uses Next.js for the frontend and Flask for the backend.
				The Flask server is mapped into the Next.js app under /api/. This setup allows the use of Python
				libraries on the backend while benefiting from the features of Next.js and on the frontend.
			</div>

			<h2 id="hello" className={`${projectClasses.subheading}`}>
				Data
			</h2>

			<div className={`${projectClasses.content}`}>
				The YOLoV8 model uses an annotated dataset on the Roboflow website here. It contains a total of 21,174
				images in the training set, 2,048 images in the valid set, and 1,020 images in the test set (87/8/4
				split). This dataset made it super easy to get started, especially since augmentations were already
				made.
			</div>

		
			<Image src="/images/plate-roboflow.png" alt="" width={1000} height={1000} layout="responsive" className={`${projectClasses.image}`} />
			

			<h2 id="hello" className={`${projectClasses.subheading}`}>
				Method
			</h2>

			<div className={`${projectClasses.content}`}>
				The api folder uses the Flask library for creating the api, the ultralytics library for the YOLO object
				detection model, cv2 (OpenCV) for image and video processing, and the sort library for the SORT (Simple,
				Online, and Realtime Tracker) algorithm for tracking objects in a video.
				<br /> It also uses the roboflow library for interacting with the Roboflow platform, which is used for
				training and deploying computer vision models, and the easyocr library for performing Optical Character
				Recognition (OCR) to convert images of text into machine-readable text. Here&apos;s a brief summary of
				each:
			</div>

			<CodeHighlight
				code={`// structure${flow}`}
				language="tsx"
				copyLabel="Copy button code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<div className={`${projectClasses.content}`}>Here was the code used to initialize the Roboflow model.</div>
			<div>
				<div className={`${projectClasses.subheading}`}>Base Script</div>
				<div>
					lp.py is the base script that upload_lp.py and realTime_lp.py are built upon. It contains a function
					licensePlate() that uses the YOLO and Roboflow models to detect vehicles and license plates in a
					video. It also uses the SORT algorithm for tracking vehicles across frames. The detected license
					plates are read using the EasyOCR library.
				</div>
				<div className={`${projectClasses.subheading}`}>Upload Videos</div>
				<div>
					upload_lp.py is similar to lp.py but is designed to work with user-uploaded videos. It contains a
					function licensePlate(filepath) that takes a file path as input and performs vehicle and license
					plate detection on the video at that path.
					<br />
					The model was not always able to track the vehicles in every frame and as a result, we ended up with
					a glitchy video. Because of this, we used the SORT algorithm. After the YOLO model from the
					Ultralytics library detects vehicles in each frame, the SORT algorithm is applied to track these
					vehicles across frames. This is done by associating the detected vehicles in the current frame with
					those in the previous frame based on their bounding box coordinates. Then, the add_missing_data.py
					is able to use the results in order fill in the missing frames in the designated csv file. This way,
					multiple rendered frames wouldn&apos;t be missing, and we could avoid the glitchy display.
				</div>

				<div className={`${projectClasses.subheading}`}>Real-Time Analysis</div>
				<div>
					realTime_lp.py is similar to upload_lp.py but is designed to work with real-time video streams
					instead of uploaded videos.
					<br />
					The realTime_lp.py file has a function called realTime(stop_event, frame_queue) for real-time
					license plate recognition from a video feed. It initializes SORT tracker, YOLO, and Roboflow models,
					opens a video stream, and reads frames until a stop event or video end. Every 5 frames, it detects
					and tracks vehicles, identifies license plates, reads their text with EasyOCR, and stores the
					results. Processed frames are put into a queue for API retrieval, and results are written to a CSV
					file.
					<br /> The function runs in a separate thread, with stop_event signaling it to stop and frame_queue
					passing processed frames to the API.
				</div>

				<div className={`${projectClasses.subheading}`}>API</div>
				<div>
					<div>
						The api.py file serves as the Flask app's main entry point, defining API routes and
						functionalities. Functions like allowed_file() check for permitted file extensions, while routes
						like /upload and /download handle video file uploads and downloads, respectively. Other routes
						like /start and /stop manage the real-time license plate recognition script, running it in
						separate threads. The script also handles video streaming through the /video route.
						Additionally, the Flask application is initialized, the upload folder is set, and the server
						starts when the script runs directly.
					</div>
				</div>
				<div className={`${projectClasses.subheading}`}>Results</div>
				<div>It took a while to process, but the video turned out amazing!</div>
				<div className={`${projectClasses.subheading}`}>Further Improvements</div>
				<div>
					1. The realTime_lp.py script could further be improved. Was stuck a little on why the live feed was
					slow and unresponsive. Possibly could further fix the frame rate, but it was reasonable considering
					the the model would have the process the live feed real-time. Researching and implementing a more
					efficient method could improve performance.
					<br />
					2. The current code lacks comprehensive error handling. For instance, in the upload_file() function,
					there's no handling for potential issues like file save errors. Adding try-except blocks around
					these operations could improve the robustness of the application.
					<br />
					3. There's a significant amount of code duplication, especially in the licensePlate() functions in
					api/lp.py and api/upload_lp.py. This could be refactored into a common function or module.
				</div>
			</div>
		</Layout>
	)
}

export default Project
