import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout, { projectClasses } from 'src/pages/projects/layout'
import '@mantine/code-highlight/styles.css'
import { CodeHighlight } from '@mantine/code-highlight'
import { Code } from '@mantine/core'
import Image from 'next/image'
import { CodeHighlightTabs } from '@mantine/code-highlight'
import Link from 'next/link'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'


const Project = () => {
	const load = `
with open('2011_10_03/calib_cam_to_cam.txt','r') as f:
calib = f.readlines()

# get projection matrices (rectified left camera --> left camera (u,v,z))
P_rect2_cam2 = np.array([float(x) for x in calib[25].strip().split(' ')[1:]]).reshape((3,4))

# get rectified rotation matrices (left camera --> rectified left camera)
R_ref0_rect2 = np.array([float(x) for x in calib[24].strip().split(' ')[1:]]).reshape((3, 3,))

# add (0,0,0) translation and convert to homogeneous coordinates
R_ref0_rect2 = np.insert(R_ref0_rect2, 3, values=[0,0,0], axis=0)
R_ref0_rect2 = np.insert(R_ref0_rect2, 3, values=[0,0,0,1], axis=1)

# get rigid transformation from Camera 0 (ref) to Camera 2
R_2 = np.array([float(x) for x in calib[21].strip().split(' ')[1:]]).reshape((3,3))
t_2 = np.array([float(x) for x in calib[22].strip().split(' ')[1:]]).reshape((3,1))

# get cam0 to cam2 rigid body transformation in homogeneous coordinates
T_ref0_ref2 = np.insert(np.hstack((R_2, t_2)), 3, values=[0,0,0,1], axis=0)
	`
	const transform = `
T_velo_ref0 = get_rigid_transformation(r'2011_10_03/calib_velo_to_cam.txt')
T_imu_velo = get_rigid_transformation(r'2011_10_03/calib_imu_to_velo.txt')

# transform from velo (LiDAR) to left color camera (shape 3x4)
T_velo_cam2 = P_rect2_cam2 @ R_ref0_rect2 @ T_ref0_ref2 @ T_velo_ref0 

# homogeneous transform from left color camera to velo (LiDAR) (shape: 4x4)
T_cam2_velo = np.linalg.inv(np.insert(T_velo_cam2, 3, values=[0,0,0,1], axis=0)) 

# transform from IMU to left color camera (shape 3x4)
T_imu_cam2 = T_velo_cam2 @ T_imu_velo

# homogeneous transform from left color camera to IMU (shape: 4x4)
T_cam2_imu = np.linalg.inv(np.insert(T_imu_cam2, 3, values=[0,0,0,1], axis=0)) 
	`

	const yolo = `
# clone repo
!git clone https://github.com/ultralytics/yolov5

# install requirements for cloned repo
!pip install -r yolov5/requirements.txt 

import torch

model = torch.hub.load('ultralytics/yolov5', 'yolov5s')  # or yolov5m, yolov5l, yolov5x, custom

# set confidence and IOU thresholds
model.conf = 0.25  # confidence threshold (0-1), default: 0.25
model.iou = 0.25  # NMS IoU threshold (0-1), default: 0.45
	`
	const uvz = `
def get_uvz_centers(image, velo_uvz, bboxes, draw=True):

	# unpack LiDAR camera coordinates
	u, v, z = velo_uvz

	# get new output
	bboxes_out = np.zeros((bboxes.shape[0], bboxes.shape[1] + 3))
	bboxes_out[:, :bboxes.shape[1]] = bboxes

	# iterate through all detected bounding boxes
	for i, bbox in enumerate(bboxes):
		pt1 = torch.round(bbox[0:2]).to(torch.int).numpy()
		pt2 = torch.round(bbox[2:4]).to(torch.int).numpy()

		# get center location of the object on the image
		obj_x_center = (pt1[1] + pt2[1]) / 2
		obj_y_center = (pt1[0] + pt2[0]) / 2

		# now get the closest LiDAR points to the center
		center_delta = np.abs(np.array((v, u)) 
								- np.array([[obj_x_center, obj_y_center]]).T)
		
		# choose coordinate pair with the smallest L2 norm
		min_loc = np.argmin(np.linalg.norm(center_delta, axis=0))

		# get LiDAR location in image/camera space
		velo_depth = z[min_loc]; # LiDAR depth in camera space
		uvz_location = np.array([u[min_loc], v[min_loc], velo_depth])
		
		# add velo projections (u, v, z) to bboxes_out
		bboxes_out[i, -3:] = uvz_location

		# draw depth on image at center of each bounding box
		# This is depth as perceived by the camera
		if draw:
			object_center = (np.round(obj_y_center).astype(int), 
								np.round(obj_x_center).astype(int))
			cv2.putText(image, 
						'{0:.2f} m'.format(velo_depth), 
						object_center, # top left
						cv2.FONT_HERSHEY_SIMPLEX, 
						0.5, # font scale
						(255, 0, 0), 2, cv2.LINE_AA)    
			
	return bboxes_out
	`

	const fourfive = `
import pymap3d as pm

def imu2geodetic(x, y, z, lat0, lon0, alt0, heading0):

	# convert to RAE
	rng = np.sqrt(x**2 + y**2 + z**2)
	az = np.degrees(np.arctan2(y, x)) + np.degrees(heading0)
	el = np.degrees(np.arctan2(np.sqrt(x**2 + y**2), z)) + 90

	# convert to geodetic
	lla = pm.aer2geodetic(az, el, rng, lat0, lon0, alt0)

	# convert to numpy array
	lla = np.vstack((lla[0], lla[1], lla[2])).T

	return lla
	`
	const imu_arr = `
array([[     11.446,     -2.4976,    -0.11944],
		[     18.329,      7.4931,    -0.10848],
		[     12.042,       3.171,    -0.15168],
		[     10.179,      6.7471,    -0.27394],
		[     22.516,     -2.7816,   -0.097632],
		[     23.267,      3.5915,    -0.11063],
		[     42.149,     -2.9994,    0.094871],
		[      42.73,     0.25856,    0.035392],
		[     30.901,      3.4319,   -0.079718],
		[     12.655,     -5.6226,    -0.29658],
		[     42.319,      9.3668,    -0.33184],
		[     53.193,      4.1462,    0.099585],
		[     52.078,      -2.119,    -0.14531]])
	`
	const uvz_arr = `
array([[     767.15,      239.49,      10.357],
		[     287.25,      211.88,       17.25],
		[     386.57,      235.75,      10.959],
		[     58.848,      255.17,      9.1014],
		[     694.49,      207.35,      21.425],
		[     485.02,       205.4,      22.184],
		[        657,      190.25,      41.056],
		[     600.06,      190.73,       41.64],
		[     520.37,      197.81,      29.817],
		[     944.73,      245.45,      11.564],
		[     441.19,      196.18,      41.244],
		[     548.04,      187.04,      52.107],
		[     635.03,      191.27,      50.987]])
`
	const difference = `
array([ -0.0095994,   0.0013328,  -0.0028969,   0.0023714,   -0.010605,  -0.0032876,   -0.013486,  -0.0092651,  -0.0040865,   -0.011558,   0.0044812,  -0.0059038,   -0.010697])
`
	const draw = `
canvas_height = stacked.shape[0]
canvas_width = 500

# get consistent center for ego vehicle
ego_center = (250, int(canvas_height*0.95))

# get rectangle coordiantes for ego vehicle
ego_x1 = ego_center[0] - 5
ego_y1 = ego_center[1] - 10
ego_x2 = ego_center[0] + 5
ego_y2 = ego_center[1] + 10

def draw_scenario(canvas, imu_xyz, sf=12):
	# draw ego vehicle
	cv2.rectangle(canvas, (ego_x1, ego_y1), (ego_x2, ego_y2), (0, 255, 0), -1);

	# draw detected objects
	for val in imu_xyz:
		obj_center = (ego_center[0] - sf*int(np.round(val[1])),
						ego_center[1] - sf*int(np.round(val[0])))
		# cv2.circle(canvas, obj_center, 5, (255, 0, 0), -1);

		# get object rectangle coordinates
		obj_x1 = obj_center[0] - 5
		obj_y1 = obj_center[1] - 10
		obj_x2 = obj_center[0] + 5
		obj_y2 = obj_center[1] + 10

		cv2.rectangle(canvas, (obj_x1, obj_y1), (obj_x2, obj_y2), (255, 0, 0), -1);

	return canvas

canvas = np.zeros((canvas_height, canvas_width, 3), dtype=np.uint8)
draw_scenario(canvas, imu_xyz, sf=12)
plt.imshow(canvas);
`
	const three = `
def get_detection_coordinates(image, bin_path, draw_boxes=True, draw_depth=True):

    ## 1. compute detections in the left image
    detections = model(image)

    # draw boxes on image
    if draw_boxes:
        detections.show() 

    # get bounding box locations (x1,y1), (x2,y2) Prob, class
    bboxes = detections.xyxy[0].cpu() # remove from GPU

    # get LiDAR points and transform them to image/camera space
    velo_uvz = project_velobin2uvz(bin_path, 
                                   T_velo_cam2, 
                                   image, 
                                   remove_plane=True)

    # get uvz centers for detected objects
    bboxes = get_uvz_centers(image, 
                             velo_uvz, 
                             bboxes, 
                             draw=draw_depth)

    return bboxes, velo_uvz
`

	const router = useRouter()
	const { projectName } = router.query

	const publicationDate = 'September, 2023'

	return (
		<Layout projectName={projectName as string} publicationDate={publicationDate}>
			<p className={`${projectClasses.content}`}>
				<p>
					In this exploration of the KITTI dataset, we delve into 3D object detection utilizing Early Sensor
					Fusion or Early Fusion, a technique directed at integrating raw data from perse sources prior to
					performing detection.
				</p>{' '}
				<p>
					Contrastingly, Late Fusion entails the initial detection of objects, followed by a fusion of these
					detections. In this scenario, a variant fusion method is employed where objects are first detected
					in camera images, and subsequently, their centers are fused with LiDAR data to obtain depth
					information.
				</p>
				<ul>
					Outlined below are the principal steps:
					<li>1. Object detection in camera images (Detection)</li>
					<li>2. Projection of 3D LiDAR point clouds onto 2D image space (Fusion)</li>
					Linking LiDAR depth with each detected object (Association to obtain Depth)
					<li>
						3. 3D detection, compared to 2D, is of significant value to autonomous vehicles as it grants the
						system insight into the physical locations of objects within the real world.
					</li>
				</ul>
				<p>
					<code>.txt</code> files used for data conversion and interpretation between the devices can be found{' '}
					<Link
						className={projectClasses.underline}
						href="https://github.com/MasazI/DeepLearning_TensorFlow/tree/master/KITTI/data/2011_09_26"
					>
						here
					</Link>
					. <code>kitti_utils.py</code> functions can be found{' '}
					<Link
						className={projectClasses.underline}
						href="https://github.com/itberrios/CV_tracking/blob/main/kitti_tracker/kitti_utils.py"
					>
						here
					</Link>
					.{' '}
				</p>
				<p>
					For further details, a{' '}
					<Link
						className={projectClasses.underline}
						href="https://github.com/yanii/kitti-pcl/blob/master/KITTI_README.TXT"
					>
						README
					</Link>{' '}
					regarding the KITTI data is available, with a{' '}
					<Link
						className={projectClasses.underline}
						href="https://www.cvlibs.net/publications/Geiger2013IJRR.pdf"
					>
						paper{' '}
					</Link>
					elucidating the data collection and coordinate systems. Now, let&apos;s proceed with data
					acquisition and pe in.
				</p>
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
					src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/kitti-sf-result.mov"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>

			<br />
			<h2 id="structure" className={`${projectClasses.subheading}`}>
				Data Overview
			</h2>

			<p className={`${projectClasses.content}`}>
				<p>
					The KITTI raw dataset encompasses data from four different cameras (comprising two grayscale and two
					RGB cameras), a Velodyne LiDAR, and the{' '}
					<Link
						className={projectClasses.underline}
						href="https://www.oxts.com/wp-content/uploads/2020/03/rtman-200302.pdf"
					>
						OXTS
					</Link>{' '}
					GPS navigation system.
				</p>
				<p>
					Here are the respective update rates:
					<ul>
						<li>• RGB camera: 15 Hz (15 frames per second)</li>
						<li>
							•{' '}
							<Link
								className={projectClasses.underline}
								href="https://www.oxts.com/wp-content/uploads/2020/03/rtman-200302.pdf"
							>
								OXTS
							</Link>{' '}
							GPS navigation system: 100 Hz
						</li>
						<li>• Velodyne LiDAR: 10 Hz</li>{' '}
					</ul>
				</p>
				<p>
					The synchronization of data is aligned with the LiDAR, given its lowest update rate among the
					devices. However, the synchrony among the camera, GPS/IMU (navigation), and LiDAR isn&apos;t exact,
					despite utilizing the synchronized raw data.{' '}
				</p>

				<p>
					According to the KITTI dataset documentation, the maximal time discrepancy between the
					camera/velodyne and GPS/IMU is capped at 5ms. Although more accurate measurements could be derived
					through interpolation, we will forgo addressing these minor differences for the sake of simplicity,
					as the slight error from the imperfect synchronization won&apos;t significantly affect our
					assessments. This notion will be further validated as we later project LiDAR points onto the camera
					images, where no noticeable discrepancy will be observed.
				</p>
			</p>
			<br />
			<h2 id="structure" className={`${projectClasses.subheading}`}>
				Camera | LiDAR | IMU Data
			</h2>
			<p className={`${projectClasses.content}`}>
				<p>
					Understanding the varied reference frames used by the Camera, LiDAR, and IMU, positioned differently
					on the vehicle, is crucial for the upcoming code comprehension. These devices on the ego vehicle
					(main vehicle gathering perception data) have distinct orientations.
				</p>
				<p>
					<ul>
						Camera
						<li>• x → right</li>
						<li>• y → down</li>
						<li>• z → forward</li>{' '}
					</ul>
					<ul>
						LiDAR/IMU
						<li>• x → forward</li>
						<li>• y → left</li>
						<li>• z → up</li>{' '}
					</ul>
				</p>
				<p>
					These orientations help in data conversion and interpretation between the devices. Below is the
					vehicle used to gather data for the KITTI dataset.
				</p>
			</p>
			<br />
			<Image
				src="/images/car.png"
				alt=""
				width={1000}
				height={1000}
				layout="responsive"
				className={`${projectClasses.image}`}
			/>
			<br />

			<p className={`${projectClasses.content}`}>
				<h2 id="lidar to camera" className={`${projectClasses.subheading}`}>
					LiDAR to Camera
				</h2>
				<p>
					To convert a point from LiDAR to camera image space, a sequence of transformations is performed to
					account for the differing orientations and positions of the LiDAR and camera systems on the vehicle.
					Initially, a{' '}
					<Link
						className={projectClasses.underline}
						href="https://www.seas.upenn.edu/~meam620/slides/kinematics0.pdf"
					>
						rigid body transformation
					</Link>
					, combining rotation and translation, is carried out from LiDAR to camera 0 frame. A rigid
					transformation is essentially a rotation followed by a translation. A rigid transformation matrix
					can combine these two components like so:
				</p>
				<Latex>
					{`$$
  T = \\begin{bmatrix}
  r_{11} & r_{12} & r_{13} & t_{14} \\\\
  r_{21} & r_{22} & r_{23} & t_{24} \\\\
  r_{31} & r_{32} & r_{33} & t_{34}
  \\end{bmatrix}
  $$`}
				</Latex>
				<p>
					Where the r&apos;s correspond to the 3x3 rotation matrix and the t&apos;s correspond to the 3x1
					translation vector.
				</p>
				<p>
					To convert a transformation matrix to its homogeneous representation, we add a row of new
					coordinates on the bottom, where 0&apos;s will be placed under the rotation portion and a 1 will be
					placed under the translation portion. This would be the transformation matrix!
				</p>
				<Latex>{`$$
    T = \\begin{bmatrix}
            r_{11} & r_{12} & r_{13} & t_{14} \\\\
            r_{21} & r_{22} & r_{23} & t_{24} \\\\
            r_{31} & r_{32} & r_{33} & t_{34} \\\\
                 0 &      0 &      0 & 1      
        \\end{bmatrix}
$$`}</Latex>
				<p>
					{' '}
					That was a little vague, so let&apos;s go into a little more detail about how we got the
					transformation matrix. The KITTI{' '}
					<a href="https://www.cvlibs.net/publications/Geiger2013IJRR.pdf">paper</a> describes the
					transformation from LiDAR to camera <Latex>{`$i$`}</Latex> as follows, where each transformation
					matrix has been converted to its homogeneous representation. The difference here is that we have
					changed the notation and added the transformation to the desired camera reference.
				</p>
				<Latex>{`$$
\\tilde{y} = P^{cam2}_{rect2} R^{rect2}_{ref2} T^{ref2}_{ref0} T^{ref0}_{velo} \\tilde{x},
  \\qquad \\text{where } \\tilde{x} = [x, y, z, 1]^T
$$`}</Latex>
				<Latex>{`$$
\\tilde{y} = \\left( \\tilde{u}, \\tilde{v}, z, 1 \\right)
$$`}</Latex>
				<p>For convenience we will denote the transformation from LiDAR to Camera 2 like so:</p>
				<Latex>{`$$
T^{cam2}_{velo} = P^{cam2}_{rect2} R^{rect2}_{ref2} T^{ref2}_{ref0} T^{ref0}_{velo}
$$`}</Latex>
				<p>
					<ul>
						<li>
							<Latex>{`$T^{ref}_{velo}$`}</Latex> - LiDAR to Camera Reference → transforms a 3D point
							relative to the LiDAR to a 3D point relative to the Camera
						</li>
						<li>
							<Latex>{`$T^{ref2}_{ref0}$`}</Latex> - Rigid Body Transformation from Camera 0 to to reach
							the desired Camera 2
						</li>
						<li>
							<Latex>{`$R^{rect2}_{ref2}$`}</Latex> - Camera 2 to Rectified Camera 2 reference.
							It&apos;solely based on a rotation and aligns the stereo images to the same y-axis, aiding
							in accurate depth perception.
						</li>
						<li>
							<Latex>{`$P^{cam2}_{rect2}$`}</Latex> - Rectified Camera 2 to 2D Camera 2 (u,v,z) coordinate
							space
						</li>
						<li>
							<Latex>{`$T^{cam2}_{velo}$`}</Latex> - 3D LiDAR space to 2D Camera 2 (u,v,z) coordinate
							space.
						</li>
					</ul>
				</p>
				<p>
					{' '}
					<a className="font-bold">Note:</a> We still denote (u,v,z) as 2D space even though we have z since
					we are referring to the 2D camera image space with real world depth relative to the camera.
				</p>
				<p>
					Where (u,v,z) are the final camera coordinates after the rectification and{' '}
					<Link
						className={projectClasses.underline}
						href="https://www.seas.upenn.edu/~meam620/slides/kinematics0.pdf"
					>
						projection
					</Link>{' '}
					transforms. In order to transform from homogeneous image coordinates <Latex>{`$\\tilde{y}$`}</Latex>{' '}
					to true (u, v, z) image coordinates y, we will need to normalize by the depth and drop the 1, like
					so:
				</p>
				<Latex>{`$$
y = \\left( \\frac{\\tilde{u}}{z}, \\frac{\\tilde{v}}{z}, z \\right)
$$`}</Latex>
				<p>
					These transformations can be encapsulated into a single matrix, simplifying the LiDAR to Camera
					transformation into one operation. The final coordinates in camera space are denoted as (u, v, z),
					where z provides depth information in the 2D image space.
				</p>
				<Latex>
					{`$$
    T = \\begin{bmatrix}
	r_{11} & r_{12} & r_{13} & t_{14} \\\\
	r_{21} & r_{22} & r_{23} & t_{24} \\\\
	r_{31} & r_{32} & r_{33} & t_{34} \\\\
		 0 &      0 &      0 & 1      \\\\
\\end{bmatrix}
  $$`}
				</Latex>{' '}
				<p>
					<a className="font-bold">Note:</a> The notation convention is that the starting reference frame is
					in the subscript and the ending reference frame is in the superscript. The <Latex>{`$1$`}</Latex>{' '}
					added as the 4th coordinate in homogeneous representation is sometimes referred to as{' '}
					<Latex>{`$w$`}</Latex>.
				</p>
				<br />
				<h2 id="camera to lidar" className={`${projectClasses.subheading}`}>
					Camera to LiDAR
				</h2>
				<p>
					To transition from Camera to LiDAR, or from IMU to LiDAR/Camera, similar transformation steps are
					followed, utilizing the homogeneous representation of transformation matrices, and inverting the
					transformation matrix to reverse the transformation direction.
				</p>
				<p>
					First, we need to convert <Latex>{`$T^{cam2}_{velo}$`}</Latex>
					to its homogeneous representation. We can do that by adding a row of new coordinates at the bottom,
					where 0&apos;s will be placed under the rotation portion and a 1 will be placed under the
					translation portion.
					<Latex>
						{`$$
    T^{cam2}_{velo} = \\begin{bmatrix}
                         t_{11} & t_{12} & t_{13} & t_{14} \\\\
                         t_{21} & t_{22} & t_{23} & t_{24} \\\\
                         t_{31} & t_{32} & t_{33} & t_{34} \\\\
                              0 &      0 &      0 & 1      
                     \\end{bmatrix}
    $$`}
					</Latex>
					Next, we need to convert <Latex>{`$y$`}</Latex> back to its homogeneous form{' '}
					<Latex>{`$\\tilde{y}$`}</Latex>.
					<Latex>
						{`$$ 
    \\tilde{y} = (u \\cdot z,\\; v \\cdot z,\\; z,\\; 1) 
    $$`}
					</Latex>
					Finally, we can get the homogeneous representation in LiDAR coordinates by inverting the homogeneous
					transformation{' '}
					<a href="http://www.info.hiroshima-cu.ac.jp/~miyazaki/knowledge/teche0053.html">matrix</a>.
					<Latex>
						{`$$
    \\begin{align*}
        T^{velo}_{cam2} &= (T^{cam2}_{velo})^{-1} \\\\[1em]
        T^{velo}_{cam2} \\tilde{y} &= \\tilde{x}
    \\end{align*}
    $$`}
					</Latex>
				</p>
				<h2 id="imu to lidar" className={`${projectClasses.subheading}`}>
					IMU to LiDAR
				</h2>
				<p>
					We will also need to translate IMU to LiDAR, thankfully we have a single matrix{' '}
					<Latex>{`$T^{velo}_{imu}$`}</Latex> that will handle this in a single operation.
				</p>
				<Latex>{`$$y_{velo} = T^{velo}_{imu} x_{imu}$$`}</Latex>
				<p>
					And once we have <Latex>{`$y_{velo}$`}</Latex> we can convert it to camera coordinates using the
					equations above, or we can compose the transformations, to go from IMU to Camera 2:
				</p>
				<Latex>{`$$T^{cam2}_{imu} =P^{cam2}_{rect2} R^{rect2}_{ref2} T^{ref2}_{ref0} T^{ref0}_{velo} T^{velo}_{imu}$$`}</Latex>
				<p>
					To transform from the Camera to IMU coordinates, we can do a very similar operation as we did for
					camera to LiDAR. We just use the homogeneous representation of the transformation matrix and take
					its inverse, then we can invert the transform.
				</p>
				<Latex>{`$$
\\begin{align*}
    T^{imu}_{cam2} &= (T^{cam2}_{imu})^{-1} \\\\[1em]
    T^{imu}_{cam2} \\tilde{y}_{cam2} &=  \\tilde{x}_{imu}
\\end{align*}
$$`}</Latex>
				<p>
					We can transform to any camera <Latex>{`$i$`}</Latex> just by replacing{' '}
					<Latex>{`$P^{cami}_{recti}$`}</Latex> and <Latex>{`$R^{ref}_{rect2}$`}</Latex> with the proper
					matrices from our calibration file <Code>calib_cam_to_cam.txt</Code>
				</p>
				<br />
				<h2 id="imu to geodetic" className={`${projectClasses.subheading}`}>
					IMU to Geodetic
				</h2>
				<p>
					Moreover, transitioning from IMU to Geodetic coordinates involves converting Cartesian coordinates
					to spherical coordinates (Slant Range, Azimuth, Elevation), which are then translated to Geodetic
					coordinates (Latitude, Longitude, Altitude) using external libraries like pymap3d.
				</p>
				<p>
					We can transform to any camera <Latex>{`$i$`}</Latex> just by replacing{' '}
					<Latex>{`$P^{cami}_{recti}$`}</Latex> and <Latex>{`$R^{ref}_{rect2}$`}</Latex> with the proper
					matrices from our calibration file calib_cam_to_cam.txt.
				</p>
				<Latex>
					{`$$
  range = \\sqrt{x^2 + y^2 + z^2} \\\\[1em]
  azimuth = \\arctan \\left( \\frac{y}{x} \\right) \\\\[1em]
  elevation = \\arctan \\left(\\frac{\\sqrt{x^2 + y^2}}{z} \\right)
  $$`}
				</Latex>
				<p>
					This process ensures accurate representation and translation of points across different sensor
					coordinate systems, crucial for tasks like object detection and navigation in autonomous systems.
					Below we load calibration data.
				</p>
			</p>
			<br />
			<h2 id="camera calib data" className={`${projectClasses.subheading}`}>
				Camera Calib Data
			</h2>
			<p className={`${projectClasses.content}`}>
				<p>
					With the code below, we load the camera data. The code snippet reads calibration data from
					<Code>calib_cam_to_cam.txt</Code>, extracts various transformation matrices, and transforms them
					into homogeneous coordinates. It obtains a projection matrix for mapping rectified left camera to
					left camera coordinates, a rectified rotation matrix for the left camera, and a{' '}
					<Link
						className={projectClasses.underline}
						href="https://www.seas.upenn.edu/~meam620/slides/kinematics0.pdf"
					>
						rigid body transformation
					</Link>{' '}
					matrix from Camera 0 to Camera 2, adjusting them for homogeneous coordinate transformations.
				</p>
			</p>
			<br />
	
			<CodeHighlight
				code={`${load}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			
			/>
			<br />

			<h2 id="lidar, gpu/imu calib data" className={`${projectClasses.subheading}`}>
				LiDAR, GPS/IMU Calib Data
			</h2>
			<p className={`${projectClasses.content}`}>
				Next we obtain the matrix to transform 3D LiDAR/Velo (x, y, z) coordinates to 2D camera (u,v)
				coordinates, and it&apos;s homogeneous inverse that will allow us to transform from camera (u, v, z, 1)
				back to LiDAR (x, y, z, 1). With this, we can get the transformation matrix for IMU to camera and camera
				to IMU. We use the <code>get_rigid_transformation()</code> function from the <code>kitti_utils.py</code>{' '}
				file mentioned at the beginning of the article.
			</p>
			<br />
			<CodeHighlight
				code={`${transform}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />

			<p className={`${projectClasses.content}`}>
				Now that we are able to project the LiDAR points onto the image, we can associate points on the image
				with LiDAR depth.
			</p>
			<br />

			<h2 id="Method" className={`${projectClasses.subheading}`}>
				YOLOv5
			</h2>

			<p className={`${projectClasses.content}`}>
				We will use YOLOv5 to detect objects in 2D, then we will find their corresponding depths. Then using our
				GPS/IMU data we can find out where all of these objects are located in the world via Latitude and
				Longitude.
			</p>
			<br />
			<CodeHighlight
				code={`${yolo}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<p>
				<br />
				<h2 id="Base Script" className={`${projectClasses.subheading}`}>
					Detection Pipeline
				</h2>
				<p className={`${projectClasses.content}`}>
					<p>
						Understanding the varied reference frames used by the Camera, LiDAR, and IMU, positioned
						differently on the vehicle, is crucial for the upcoming code comprehension. These devices on the
						ego vehicle (main vehicle gathering perception data) have distinct orientations.
					</p>
					<p>
						<ul>
							Camera
							<li>• Camera (u, v, z)</li>
							<li>• LiDAR (x, y, z)</li>
							<li>• IMU (x, y, z)</li>{' '}
						</ul>
					</p>
					<p>The fundamental steps are:</p>

					<p>1. Identify objects in the camera image with the YOLO model defined above.</p>
					<p>2. Map LiDAR point cloud to camera (u,v,z) coordinates.</p>
					<p>
						We will employ a function from our KITTI utilities script, utilizing our rotation matrix 𝑇 to
						transform LiDAR (x,y,z) coordinates into camera (u,v,z) coordinates. This function also manages
						the exclusion of points that venture outside the cameras Field of View (FOV). Additionally, it
						facilitates the removal of the ground plane from the LiDAR point cloud using the{' '}
						<Link
							className={projectClasses.underline}
							href="https://en.wikipedia.org/wiki/Random_sample_consensus"
						>
							RANSAC
						</Link>{' '}
						algorithm from sklearn. Essentially,{' '}
						<Link
							className={projectClasses.underline}
							href="https://en.wikipedia.org/wiki/Random_sample_consensus"
						>
							RANSAC
						</Link>{' '}
						aims to identify the most extensive plane within the point cloud, which we then eliminate.
					</p>

					<br />
					<CodeHighlightTabs
						withExpandButton
						defaultExpanded={false}
						expandCodeLabel="Show full code"
						collapseCodeLabel="Show less"
						code={[{ fileName: 'get_uvz_centers', code: uvz, language: 'py' }]}
					/>

					<br />

					<p>3. Associate projected (u,v,z) points with object centers.</p>
					<p>
						To associate the detected object centers with the (u,v,z) points, we evaluate the{' '}
						<Link
							className={projectClasses.underline}
							href="https://montjoile.medium.com/l0-norm-l1-norm-l2-norm-l-infinity-norm-7a7d18a4f40c"
						>
							L2 Norm
						</Link>{' '}
						between the object bounding box center location and all projected LiDAR (u, v) points. We then
						select the point with the smallest{' '}
						<Link
							className={projectClasses.underline}
							href="https://montjoile.medium.com/l0-norm-l1-norm-l2-norm-l-infinity-norm-7a7d18a4f40c"
						>
							L2 Norm
						</Link>
						.
					</p>

					<br />
					<CodeHighlightTabs
						withExpandButton
						defaultExpanded={false}
						expandCodeLabel="Show full code"
						collapseCodeLabel="Show less"
						code={[{ fileName: 'get_detection_coords', code: three, language: 'py' }]}
					/>

					<br />

					<p>4. Convert (u,v,z) object centers to IMU (x,y,z) coordinates.</p>
					<p>
						To transition the (u,v,z) object centers, simply convert them to homogeneous coordinates and
						utilize our homogeneous transformation to obtain the IMU (x,y,z) coordinates.
					</p>
					<p>5. Convert IMU to LLA</p>

					<p>
						Now, the goal is to change the object IMU (x, y, z) coordinates to Azimuth, Elevation, and
						Range. Following this, pymap3d can be employed to convert the object centers to Latitude,
						Longitude, and Altitude. While the KITTI dataset doesn&apos;t clarify the type of altitude, the{' '}
						<Link
							className={projectClasses.underline}
							href="https://www.oxts.com/wp-content/uploads/2020/03/rtman-200302.pdf"
						>
							OXTS
						</Link>{' '}
						documentation mentions the measurement can be either geoidal (MSL) or ellipsoidal (HAE). For
						more details, refer to this link. We&apos;ll proceed under the assumption that the type of
						altitude is not critical.
					</p>
				</p>

				<br />

				<CodeHighlight
					code={`${fourfive}`}
					language="py"
					copyLabel="Copy code"
					copiedLabel="Copied!"
					className={`${projectClasses.code}`}
				/>

				<br />
				<h2 id="Upload Videos" className={`${projectClasses.subheading}`}>
					Test Pipeline
				</h2>
				<p className={`${projectClasses.content}`}>
					Let&apos;s put everything together by stacking the detection model on top of the LiDAR results.
				</p>
				<br />
				<Image
					src="/images/stack.png"
					alt=""
					width={1000}
					height={1000}
					layout="responsive"
					className={`${projectClasses.image}`}
				/>

				<br />

				<p className={`${projectClasses.content}`}>
					Let&apos;s project the LiDAR point cloud onto the camera image. We will see even though there is a
					slight time difference between the Camer and LiDAR, the points are still aligned with the image
					objects, confirming that the time difference is negligable for this purpose.
				</p>

				<br />
				<Image
					src="/images/overlay.png"
					alt=""
					width={1000}
					height={1000}
					layout="responsive"
					className={`${projectClasses.image}`}
				/>

				<br />

				<h2 id="Real-Time Analysis" className={`${projectClasses.subheading}`}>
					Double Check
				</h2>
				<p className={`${projectClasses.content}`}>
					After obtaining (x, y, z) coordinates of detected objects in multiple reference frames, it&apos;s
					advisable to validate the accuracy of the transformations. While we lack ground truth, camera images
					can provide a basic validation. By examining the (u,v,z) positions, particularly the z (depth)
					relative to the left color camera, and correlating these with the objects in the image, we can
					perform a reality check. Additionally, by comparing the rotation transformation from Camera to IMU,
					especially since the IMU is located 1.08 meters behind the camera, further validation can be
					achieved.
				</p>

				<br />
				<CodeHighlight
					code={`${imu_arr}`}
					language="py"
					copyLabel="Copy code"
					copiedLabel="Copied!"
					className={`${projectClasses.code}`}
				/>
				<br />
				<CodeHighlight
					code={`${uvz_arr}`}
					language="py"
					copyLabel="Copy code"
					copiedLabel="Copied!"
					className={`${projectClasses.code}`}
				/>
				<br />

				<CodeHighlight
					code={`${difference}`}
					language="py"
					copyLabel="Copy code"
					copiedLabel="Copied!"
					className={`${projectClasses.code}`}
				/>
				<br />

				<p className={`${projectClasses.content}`}>
					<p>
						We can see that the errors between the theoretical IMU x values and the actual x values are
						fairly low. For the remaining IMU values we can wee that the y (horizontal) and z (vertical)
						have numbers that make sense based on the object locations on the image. Now that we have
						locations for each object we can reconstruct the scene at each frame, using the LLA locations.
						Using the folium library we can visualize these locations for each object.
					</p>
					<br />
					<Image
						src="/images/folium.png"
						alt=""
						width={1000}
						height={1000}
						layout="responsive"
						className={`${projectClasses.image}`}
					/>

					<br />
					<p>
						Now we can use opencv2 to display the environment detected by the Camera and LiDAR. In this case
						we will draw a rectangle for every detected object, but you can use the detected MSCOCO class in
						bboxes and draw custom symbols for each different object. You could also cluster the data in
						LiDAR space and draw symbols based on the clustered data shape.
					</p>
				</p>
				<br />

				<CodeHighlightTabs
					withExpandButton
					defaultExpanded={false}
					expandCodeLabel="Show full code"
					collapseCodeLabel="Show less"
					code={[{ fileName: 'draw_scenario', code: draw, language: 'tsx' }]}
				/>

				<br />

				<Image
					src="/images/draw.png"
					alt=""
					width={1000}
					height={1000}
					layout="responsive"
					className={`${projectClasses.image}`}
				/>

				<br />

				<p className={`${projectClasses.content}`}>
					<p>Now we stack all of the images together into a single frame!</p>
				</p>

				<br />
				<Image
					src="/images/big-stack.png"
					alt=""
					width={1000}
					height={1000}
					layout="responsive"
					className={`${projectClasses.image}`}
				/>

				<br />

				<h2 id="You are Crazy" className={`${projectClasses.subheading}`}>
					Lessons
				</h2>
				<p className={`${projectClasses.content}`}>
					<p>
						This project on KITTI 3D Object Detection through LiDAR-Camera Fusion greatly enhanced my
						understanding of sensor fusion techniques, particularly Early Fusion, for 3D object detection.
						It involved steps like object detection in camera images, projecting 3D LiDAR point clouds to 2D
						image space, and associating LiDAR depth with each detected object.
					</p>
					<p>
						Through hands-on experience, I learned how to process and synchronize data from different
						sensors like cameras and LiDAR, and how to transform coordinate systems among them.
					</p>
					<p>
						Implementing a detection pipeline using YOLOv5 for 2D object detection, and then associating
						these detections with LiDAR data to estimate their 3D positions was a significant learning
						experience. This project provided a practical understanding of challenges and solutions in
						sensor fusion, crucial for applications like autonomous vehicles, where accurate real-world
						object detection and localization are essential.
					</p>
				</p>
			</p>
		</Layout>
	)
}

export default Project
