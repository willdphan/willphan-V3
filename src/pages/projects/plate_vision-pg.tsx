import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout, { projectClasses } from 'src/pages/projects/layout'
import '@mantine/code-highlight/styles.css'
import { CodeHighlight } from '@mantine/code-highlight'
import { Code } from '@mantine/core'
import Image from 'next/image'
import { CodeHighlightTabs } from '@mantine/code-highlight'
import Link from 'next/link'

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
	const roboflow = `
	# load model
	coco_model = YOLO('yolov8n.pt')
	rf = Roboflow(api_key=os.getenv('API_KEY'))
	project = rf.workspace().project("license-plate-recognition-rxg4e")
	license_plate_detector = project.version(4).model
	`
	const lp = `
load_dotenv()

def licensePlate():
    results = {}

    mot_tracker = Sort()

    # load models
    coco_model = YOLO('yolov8n.pt')
    rf = Roboflow(api_key=os.getenv('API_KEY'))
    project = rf.workspace().project("license-plate-recognition-rxg4e")
    license_plate_detector = project.version(4).model

    # load video
    cap = cv2.VideoCapture('trim-highway.mp4')

    vehicles = [2, 3, 5, 7]

    # read frames
    frame_nmr = -1
    ret = True

    reader = easyocr.Reader(lang_list=['en'])

    while ret:
        frame_nmr += 1
        ret, frame = cap.read()

        if not ret:
            print("End of video.")
            break

        if ret:
            results[frame_nmr] = {}
            # detect vehicles
            detections = coco_model(frame)[0]
            # ... (code omitted for brevity) ...

            # track vehicles with SORT
            track_ids = mot_tracker.update(np.asarray(detections_))

            # detect license plates
            license_plates = license_plate_detector.predict(frame, confidence=40, overlap=30).json()

            for license_plate in license_plates['predictions']:
                # ... (code omitted for brevity) ...

                # assign license plate to car
                xcar1, ycar1, xcar2, ycar2, car_id = get_car([x1, y1, x2, y2, confidence, class_id], track_ids)

                # if valid car id is found, aka if not unidentified
                if car_id != -1:
                    # ... (code omitted for brevity) ...

                    license_plate_text, license_plate_text_score = read_license_plate(license_plate_crop_thresh, reader)

                    if license_plate_text is not None:
                        results[frame_nmr][car_id] = {'car': {'bbox': [xcar1, ycar1, xcar2, ycar2]},
                                                    'license_plate': {'bbox': [x1, y1, x2, y2],
                                                                        'text': license_plate_text,
                                                                        'bbox_score': score,
                                                                        'text_score': license_plate_text_score}}
    # ... (code omitted for brevity) ...
    return results
	`

	const upload = `
	# upload_lp.py
	def licensePlate(filepath):
		# ...
		cap = cv2.VideoCapture(filepath)
		# ...
	
	# lp.py
	def licensePlate():
		# ...
		cap = cv2.VideoCapture('trim-highway.mp4')
		# ...
	`
	const upload2 = `
	# upload_lp.py
	write_csv(results, 'api/data/userupload.csv')   
	
	with open('api/data/userupload.csv', 'r') as file:
		reader = csv.DictReader(file)
		data = list(reader)
	
	interpolated_data = interpolate_bounding_boxes(data)
	
	header = ['frame_nmr', 'car_id', 'car_bbox', 'license_plate_bbox', 'license_plate_bbox_score', 'license_number', 'license_number_score']
	with open('api/data/userupload.csv', 'w', newline='') as file:
		writer = csv.DictWriter(file, fieldnames=header)
		writer.writeheader()
		writer.writerows(interpolated_data)
	`

	const realtime = `
	# realTime_lp.py
	cap = cv2.VideoCapture(1)
	
	# upload_lp.py
	cap = cv2.VideoCapture(filepath)
	`
	const realtime2 = `
	# realTime_lp.py
	def realTime(stop_event, frame_queue):
		# ...
		while not stop_event.is_set() and ret:
			# ...
			if stop_event.is_set():
				print("Stopping the script.")
				break
			# ...
			frame_queue.put(frame)  # Put the frame in the queue for the API to pick up
	`
	const api = `
	UPLOAD_FOLDER = 'public'
	ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov'}
	
	# Initialize the global variable
	stop_event = threading.Event()
	
	frame_queue = Queue()
	
	app = Flask(__name__)
	# local frontend
	CORS(app)
	
	app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
	
	def allowed_file(filename):
		return '.' in filename and \
			   filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
	
	# UPLOAD VIDEO
	
	@app.route('/upload', methods=['POST'])
	def upload_file():
		if 'file' not in request.files:
			return jsonify({"error": "No file part"}), 400
		file = request.files['file']
		if file.filename == '':
			return jsonify({"error": "No selected file"}), 400
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
			file.save(filepath)
			
			# Start a new thread to process the video
			t = threading.Thread(target=licensePlate, args=(filepath,))
			t.start()
			
			return jsonify({"status": "File uploaded and processing started", "download_url": f"/download/{filename}"}), 200
		else:
			return jsonify({"error": "File type not allowed"}), 400
	
	# DOWNLOAD EDITED VIDEO
	
	@app.route('/download', methods=['GET'])
	def download_file():
		# returns current working directory
		current_path = os.getcwd()
		print("Current Path:", current_path)  # Debug print
		
		file_path = "api/public/userdownload.mp4"
		absolute_file_path = os.path.join(current_path, file_path)
		
		print("Trying to send file:", absolute_file_path)  # Debug print
		
		if os.path.exists(absolute_file_path):
			return send_file(absolute_file_path, as_attachment=True)
		else:
			return "File not found", 404
	
	
	
	# START CAM
	
	@app.route('/start', methods=['POST'])
	def start_script():
		global t, stop_event  # Declare as global
		stop_event.clear()  # Reset the event flag
		t = threading.Thread(target=realTime, args=(stop_event, frame_queue))
		t.start()
		return jsonify({"status": "Script started"})
	
	def generate_frames():
		while True:
			if not frame_queue.empty():
				frame = frame_queue.get()
				_, buffer = cv2.imencode('.jpg', frame)
				frame = buffer.tobytes()
				print("Sending Frame")  # Debug print
				yield (b'--frame\r\n'
					   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
	
	
	@app.route('/video')
	def video():
		return Response(generate_frames(),
						mimetype='multipart/x-mixed-replace; boundary=frame')
	
	
	# @app.route('/test', methods=['GET'])
	# def test_route():
	#     return "This is a test route."
	
	# END CAM
	
	@app.route('/stop', methods=['POST'])
	def stop_script():
		global stop_event  # Declare as global
		stop_event.set()  # Signal the thread to stop
		return jsonify({"status": "Script stopped"})
	`

	const router = useRouter()
	const { projectName } = router.query

	const publicationDate = 'August, 2023'

	return (
		<Layout projectName={projectName as string} publicationDate={publicationDate}>
			<p className={`${projectClasses.content}`}>
				Plate Vision comprises a real-time license plate recognition system that uses YOLO for vehicle
				detection,{' '}
				<Link className={projectClasses.underline} href="https://universe.roboflow.com/">
					Roboflow
				</Link>{' '}
				for license plate identification, and{'  '}
				<Link className={projectClasses.underline} href="https://github.com/JaidedAI/EasyOCR">
					EasyOCR
				</Link>{' '}
				for text reading.{'  '}
				<Link className={projectClasses.underline} href="https://github.com/abewley/sort.git">
					SORT
				</Link>{' '}
				tracks vehicles across video frames. The architecture offers API endpoints for video uploads, real-time
				recognition control, and streaming. It employs multithreading for concurrent video and API handling,
				streams processed frames to clients, and manages file storage and output in CSV format.
			</p>

			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg"
			>
				<source
					src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/plate-vision-display.mov"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>

			<br />
			<h2 id="structure" className={`${projectClasses.subheading}`}>
				Structure
			</h2>

			<p className={`${projectClasses.content}`}>
				<p>
					The api directory houses the backend Flask app, including various Python scripts for routes and
					features. Inside the folder <Code>api/sort</Code>, the SORT algorithm is implemented.
				</p>
				<p>
					The tech stack includes Next.js for the frontend and Flask for the backend, integrated under
					<Code>/api/</Code>. The backend leverages libraries for tasks like object detection and license
					plate recognition. The structure looks something like this.
				</p>
			</p>
			<br />
			<CodeHighlight
				code={`// structure${structure}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />
			<p className={`${projectClasses.content}`}>
				The api folder is part of a larger project that uses Next.js for the frontend and Flask for the backend.
				The Flask server is mapped into the Next.js app under <Code>/api/</Code>. This setup allows the use of
				Python libraries on the backend while benefiting from the features of Next.js and on the frontend.
			</p>
			<br />
			<h2 id="Data" className={`${projectClasses.subheading}`}>
				Data
			</h2>

			<p className={`${projectClasses.content}`}>
				The YOLOv8 model uses an annotated dataset on the{' '}
				<Link
					className={projectClasses.underline}
					href="https://universe.roboflow.com/roboflow-universe-projects/license-plate-recognition-rxg4e/dataset/4"
				>
					Roboflow
				</Link>{' '}
				website. The dataset contains a total of 21,174 images in the training set, 2,048 images in the valid
				set, and 1,020 images in the test set (87/8/4 split). This dataset made it super easy to get started,
				especially since augmentations were already made.
			</p>
			<br />
			<Image
				src="/images/plate-roboflow.png"
				alt=""
				width={1000}
				height={1000}
				layout="responsive"
				className={`${projectClasses.image}`}
			/>
			<br />
			<h2 id="Method" className={`${projectClasses.subheading}`}>
				Method
			</h2>

			<p className={`${projectClasses.content}`}>
				<p>
					The api folder uses the Flask library for creating the api, the Roboflow library for the YOLO object
					detection model, cv2 (OpenCV) for image and video processing, and the sort library for the SORT
					(Simple, Online, and Realtime Tracker) algorithm for tracking objects in a video.
				</p>
				<p>
					The easyocr library is used for performing Optical Character Recognition (OCR) to convert images of
					text into machine-readable text.
				</p>
				Below is the code used to initialize the Roboflow model.
			</p>
			<br />
			<CodeHighlight
				code={`${roboflow}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<p>
				<br />
				<h2 id="Base Script" className={`${projectClasses.subheading}`}>
					Base Script
				</h2>
				<p className={`${projectClasses.content}`}>
					<Code>lp.py</Code> is the base script that <Code>upload_lp.py</Code> and <Code>realTime_lp.py</Code>{' '}
					are built upon. It contains a function
					<Code>licensePlate()</Code> that uses the YOLO and Roboflow models to detect vehicles and license
					plates in a video. It also uses the SORT algorithm for tracking vehicles across frames. The detected
					license plates are read using the EasyOCR library. Format shown below shortened for brevity.
				</p>
				<br />
				<CodeHighlightTabs
					withExpandButton
					defaultExpanded={false}
					expandCodeLabel="Show full code"
					collapseCodeLabel="Show less"
					code={[{ fileName: 'lp.py', code: lp, language: 'py' }]}
					copiedLabel="Copied!"
					className={`${projectClasses.code}`}
				/>
				<br />
				<h2 id="Upload Videos" className={`${projectClasses.subheading}`}>
					Upload Videos
				</h2>
				<p className={`${projectClasses.content}`}>
					<p>
						<Code>upload_lp.py</Code> is similar to <Code>lp.py</Code> but is designed to work with
						user-uploaded videos. It contains a function <Code>licensePlate(filepath)</Code> that takes a
						file path as input and performs vehicle and license plate detection on the video at that path.
					</p>
					<p>
						The <Code>licensePlate()</Code> function in <Code>upload_lp.py</Code> takes a filepath argument,
						which is the path to the video file to be processed. In <Code>lp.py</Code>, the video file path
						is hardcoded as <Code>trim-highway.mp4</Code>.
					</p>{' '}
				</p>
				<br />
				<CodeHighlight
					code={`${upload}`}
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
					<source
						src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/plate-vision-upload.mov"
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>

				<br />

				<p className={`${projectClasses.content}`}>
					Initially, the model was not always able to track the vehicles in every frame and as a result, we
					ended up with a glitchy video.{' '}
				</p>

				<br />
				<video
					autoPlay
					loop
					muted
					playsInline
					// className="w-full h-full rounded-lg border-[#121212] border-2"
					className="w-full h-full rounded-lg"
				>
					<source
						src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/plate-vision-glitch.mov"
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>
				<br />

				<p className={`${projectClasses.content}`}>
					<p>
						Because of this, we used the SORT algorithm. After the YOLO model detects vehicles in each
						frame, the SORT algorithm is applied to track these vehicles across frames. This is done by
						associating the detected vehicles in the current frame with those in the previous frame based on
						their bounding box coordinates. Then, the <Code>add_missing_data.py</Code> is able to use the
						results in order fill in the missing frames in the designated csv file. This way, multiple
						rendered frames wouldn&apos;t be missing, and we could avoid the glitchy display.
					</p>
					<p>
						After the license plate recognition results are written to a CSV file, the script reads the CSV
						file back in, performs interpolation on the bounding box data, and writes the interpolated data
						back to the CSV file. This process, however, is not done in <Code>lp.py</Code>.
					</p>
				</p>
				<br />
				<CodeHighlight
					code={`${upload2}`}
					language="py"
					copyLabel="Copy code"
					copiedLabel="Copied!"
					className={`${projectClasses.code}`}
				/>
				<br />
				<h2 id="Real-Time Analysis" className={`${projectClasses.subheading}`}>
					Real-Time Analysis
				</h2>
				<p className={`${projectClasses.content}`}>
					<Code>realTime_lp.py</Code> is similar to <Code>upload_lp.py</Code> but is designed to work with
					real-time video streams instead of uploaded videos. Keep in mind, you have a wait a little for it to
					start up.
				</p>

				<br />
				<CodeHighlight
					code={`${realtime}`}
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
					<source
						src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/plate-vision-realtime.mov"
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>

				<br />

				<p className={`${projectClasses.content}`}>
					<p>
						The <Code>realTime_lp.py</Code> file has a function called{' '}
						<Code>realTime(stop_event, frame_queue)</Code> for real-time license plate recognition from a
						video feed. It initializes SORT tracker, YOLO, and Roboflow models, opens a video stream, and
						reads frames until a stop event or video end. Every 5 frames, it detects and tracks vehicles,
						identifies license plates, reads their text with EasyOCR, and stores the results. Processed
						frames are put into a queue for API retrieval, and results are written to a CSV file.
					</p>{' '}
					<p>
						The function runs in a separate thread, with <Code>stop_event</Code> signaling it to stop and{' '}
						<Code>frame_queue</Code>
						passing processed frames to the API.
					</p>
				</p>

				<br />
				<CodeHighlight
					code={`${realtime2}`}
					language="py"
					copyLabel="Copy code"
					copiedLabel="Copied!"
					className={`${projectClasses.code}`}
				/>

				<br />
				<h2 id="API" className={`${projectClasses.subheading}`}>
					API
				</h2>
				<p className={`${projectClasses.content}`}>
					The <Code>api.py</Code> file serves as the Flask app&apos;s main entry point, defining API routes
					and functionalities. Functions like <Code>allowed_file()</Code> check for permitted file extensions,
					while routes like <Code>/upload</Code> and
					<Code>/download</Code> handle video file uploads and downloads, respectively. Other routes like{' '}
					<Code>/start</Code> and <Code>/stop</Code>
					manage the real-time license plate recognition script, running it in separate threads. The script
					also handles video streaming through the <Code>/video</Code> route. Additionally, the Flask
					application is initialized, the upload folder is set, and the server starts when the script runs
					directly.
				</p>
				<br />
				<CodeHighlightTabs
					withExpandButton
					defaultExpanded={false}
					expandCodeLabel="Show full code"
					collapseCodeLabel="Show less"
					code={[{ fileName: 'api.py', code: api, language: 'py' }]}
					copiedLabel="Copied!"
					className={`${projectClasses.code}`}
				/>
				<br />
				<h2 id="Results" className={`${projectClasses.subheading}`}>
					Results
				</h2>
				<p>It took a while to process, but the video turned out amazing!</p>
				<br />

				<video
					autoPlay
					loop
					muted
					playsInline
					// className="w-full h-full rounded-lg border-[#121212] border-2"
					className="w-full h-full rounded-lg"
				>
					<source
						src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/plate-vision-outcome.mov"
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>

				<br />
				<h2 id="Further Improvements" className={`${projectClasses.subheading}`}>
					Further Improvements
				</h2>
				<p className={`${projectClasses.content}`}>
					<p>
						1. The <Code>realTime_lp.py</Code> script could further be improved. Was stuck a little on why
						the live feed was slow and unresponsive. Possibly could further fix the frame rate, but it was
						reasonable considering the the model would have the process the live feed real-time. Researching
						and implementing a more efficient method could improve performance.
					</p>
					<p>
						2. The current code lacks comprehensive error handling. For instance, in the{' '}
						<Code>upload_file()</Code>
						function, there&apos;s no handling for potential issues like file save errors. Adding try-except
						blocks around these operations could improve the robustness of the application.
					</p>
					<p>
						3. There&apos;s a significant amount of code duplication, especially in the{' '}
						<Code>licensePlate()</Code> functions in <Code>api/lp.py</Code> and{' '}
						<Code>api/upload_lp.py</Code>. This could be refactored into a common function or module.
					</p>
				</p>
				<br />
				<h2 id="You are Crazy" className={`${projectClasses.subheading}`}>
					You are Crazy
				</h2>
				<p className={`${projectClasses.content}`}>
					<p>
						Idk how you made it this far, you are crazy. I gained an immense amount of knowledge and
						experience from working on this project. One of the key learnings was building an API using
						Flask, which served as the backbone for the entire system. This was not only educational but
						also an excellent refresher course on server-side programming.
					</p>
					<p>
						The project also afforded me the opportunity to deeply integrate the API with a frontend
						application. The synergy between the frontend and backend provided a well-rounded perspective on
						full-stack development, and it was incredibly satisfying to see the two sides interact
						seamlessly.
					</p>
					<p>
						Perhaps one of the most exciting aspects was the opportunity to work with pre-trained YOLOv8
						models for the first time. As a great starting point, this has inspired me to explore even more
						complex models and AI applications in future projects. Overall, the project was an invaluable
						learning journey that expanded my skills in multiple areas, from backend development to machine
						learning.
					</p>
				</p>
			</p>
		</Layout>
	)
}

export default Project
