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

{
	/* <br />

<CodeHighlightTabs
	withExpandButton
	defaultExpanded={false}
	expandCodeLabel="Show full code"
	collapseCodeLabel="Show less"
	code={[{ fileName: 'draw_scenario', code: draw, language: 'tsx' }]}
/>

<br /> */
}

const Project = () => {
	const difference = `
array([ -0.0095994,   0.0013328,  -0.0028969,   0.0023714,   -0.010605,  -0.0032876,   -0.013486,  -0.0092651,  -0.0040865,   -0.011558,   0.0044812,  -0.0059038,   -0.010697])
`
	const char_model = `
<plugin filename="libignition-gazebo-diff-drive-system.so" name="ignition::gazebo::systems::DiffDrive">
	<left_joint>left_wheel_joint</left_joint>
	<right_joint>right_wheel_joint</right_joint>
	<wheel_separation>1.2</wheel_separation>
	<wheel_radius>0.4</wheel_radius>
	<odom_publish_frequency>1</odom_publish_frequency>
	<!-- Topic Here -->
	<topic>cmd_vel</topic>
</plugin>
`
	const lidar_libs = `
#include <rclcpp/rclcpp.hpp>
#include <sensor_msgs/msg/laser_scan.hpp>
#include <fstream>
#include <ament_index_cpp/get_package_share_directory.hpp>
`
	const lidar_constructor = `
class LidarNode : public rclcpp::Node
{
	// Class definition goes here
};
public:
	LidarNode() : Node("lidar_node")
	{
	sub_ = this->create_subscription<sensor_msgs::msg::LaserScan>(
		"lidar", 10, std::bind(&LidarNode::callback, this, std::placeholders::_1));
	}
`
	const lidar_callback = `
private:
void callback(const sensor_msgs::msg::LaserScan::SharedPtr msg)
{
	std::ofstream file;  
	std::string package_path = ament_index_cpp::get_package_share_directory("ros2_pkg");
	std::string file_path = "/media/psf/Developer/Robotics/char-01/ros2_pkg/data";
	file.open(file_path, std::ios_base::app);
	for (const auto& range : msg->ranges)
	{
	file << range << " ";
	}
	file << "\n";
	file.close();
}
`
	const lidar_main = `
int main(int argc, char **argv)
{
	rclcpp::init(argc, argv);
	rclcpp::spin(std::make_shared<LidarNode>());
	rclcpp::shutdown();
	return 0;
}
`
	const visualize = `
for line in Lines:
distances = GetData(line)
print(len(distances))
if (len(distances) == LIDAR_RESOLUTION):
	# Create a new figure for each line
	plt.figure()

	for x in range(VISUALIZATION_RESOLUTION):
		if distances[x] == 0:
			distances[x] = 20
		a = int(float(distances[x]))/2000
		plt.plot(line_positions[x][0]*a+400,
					line_positions[x][1]*a+400, 'ko')

	plt.plot(400, 400, 'o', color=(252/255, 132/255, 3/255))
	plt.show()
`
	const train_load = `
data = pd.read_csv('.../data/[path_to_all.txt]', header=None)
`
	const train_preprocessing = `
data.rename(columns={data.columns[-1]: 'Label'}, inplace=True)
data = data[(data['Label'] != 'L') & (data['Label'] != 'R') &
			(data['Label'] != 'H') & (data['Label'] != 'J')]
data.reset_index(drop=True, inplace=True)
X = data.iloc[:, :-1]
y = data.iloc[:, -1]
`
	const train_encode = `
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)
`
	const train_split = `
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
`
	const train_feature = `
k = 80
k_best = SelectKBest(score_func=f_classif, k=k)
k_best.fit(X_train, y_train)
selected_feature_indices = k_best.get_support(indices=True)
print("selected_feature_indices: ", selected_feature_indices)
`
	const train_train = `
clf = RandomForestClassifier(max_depth=3, random_state=42)
clf.fit(X_train.iloc[:, selected_feature_indices], y_train)
`
	const train_predictions = `
y_pred = clf.predict(X_test.iloc[:, selected_feature_indices])
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy}')
class_names = label_encoder.classes_
report = classification_report(y_test, y_pred, target_names=class_names, zero_division=0)
print('Classification Report:\n', report)
`
	const train_save = `
joblib.dump(clf, '...data/rf_model/[path_to_random_forest_model.pkl'])
joblib.dump(k_best, '...data/k_best/[path_to_k_best.pkl]')
joblib.dump(label_encoder, '.../data/label_encoder/[path_to_label_encoder.pkl]')
`
	const predict_load = `
self.clf = joblib.load(
	'/media/psf/Developer/Robotics/char-01/ros2_pkg/data/rf_model/random_forest_model.pkl')
self.k_best = joblib.load(
	'/media/psf/Developer/Robotics/char-01/ros2_pkg/data/k_best/k_best.pkl')
self.label_encoder = joblib.load(
	'/media/psf/Developer/Robotics/char-01/ros2_pkg/data/label_encoder/label_encoder.pkl')
`
	const predict_callback = `
# the received data is preprocessed and
# then passed to the model to make a prediction.
def listener_callback(self, msg):
	print("listener_callback called")
	# Convert the LaserScan data to a numpy array
	data = np.array(msg.ranges)
	# Select a subset of the range readings
	data = data[:240]
	# Replace infinities with a large finite number
	data[data == np.inf] = 1e10
	# Preprocess the data
	data = self.preprocess_data(data)
	# Make a prediction
	prediction = self.clf.predict(data)
	print("Made prediction:", prediction)
	# Convert the prediction to a string
	prediction_str = ' '.join(map(str, prediction))
	# Create a String message and set its data field
	prediction_msg = String()
	prediction_msg.data = prediction_str
	# Publish the prediction
	self.publisher_.publish(prediction_msg)
`
	const predict_preprocess = `
# Preprocess data here
def preprocess_data(self, data):
	# This will depend on how you preprocessed your data when training the model
	# For example, you might need to select the best features like this:
	data = self.k_best.transform(data.reshape(1, -1))
	return data
`
	const predict_main = `
def main(args=None):
	rclpy.init(args=args)
	predictor = Predictor()
	rclpy.spin(predictor)
	# Destroy the node explicitly
	# (optional - otherwise it will be done automatically
	# when the garbage collector destroys the node object)
	predictor.destroy_node()
	rclpy.shutdown()

if __name__ == '__main__':
	main()
`
	const control_class = `
public:
ControlNode()
	: Node("control_node")
{   
	// publishes to /cmd_vel
	publisher_ = this->create_publisher<geometry_msgs::msg::Twist>("cmd_vel", 10);
	// listens to prediction
	subscription_ = this->create_subscription<std_msgs::msg::String>(
		"prediction", 10, std::bind(&ControlNode::callback, this, std::placeholders::_1));
}
`
	const control_callback = `
private:
void callback(const std_msgs::msg::String::SharedPtr msg)
{
geometry_msgs::msg::Twist twist;

// Convert the prediction from string to int
int prediction = std::stoi(msg->data);

if (prediction == 1) {
	twist.linear.x = 1.0;  // Move forward at 1.0 m/s
	twist.angular.z = 0.0;  // No rotation
} else if (prediction == 2) {
	twist.linear.x = 0.0;  // No forward movement
	twist.angular.z = 1.0;  // Rotate counter-clockwise at 1.0 rad/s
} else if (prediction == 3) {
	twist.linear.x = 0.0;  // No forward movement
	twist.angular.z = -1.0;  // Rotate clockwise at 1.0 rad/s
}

publisher_->publish(twist);
}
`
	const control_main = `
int main(int argc, char **argv)
{
	rclcpp::init(argc, argv);
	rclcpp::spin(std::make_shared<ControlNode>());
	rclcpp::shutdown();
	return 0;
}
`
	const launch = `
ExecuteProcess(
	cmd=['ign', 'gazebo', '/media/psf/Developer/Robotics/char-01/ros2_pkg/worlds/char_01_world.sdf'],
	output='screen'
)
Node(
	package="ros2_pkg",
	executable="predict.py",
	name="predict_node",
	output='screen'
)
Node(
	package="ros2_pkg",
	executable="control",
	name="control_node",
	output='screen'
)
Node(
	package="ros2_pkg",
	executable="lidar_node",
	name="lidar_node",
	output='screen'
)
ExecuteProcess(
	cmd=['ros2', 'run', 'ros_gz_bridge', 'parameter_bridge', '/lidar@sensor_msgs/msg/LaserScan@ignition.msgs.LaserScan'],
	output='screen'
)
ExecuteProcess(
	cmd=['ros2', 'run', 'ros_gz_bridge', 'parameter_bridge', '/cmd_vel@geometry_msgs/msg/Twist@ignition.msgs.Twist'],
	output='screen'
)
`

	const router = useRouter()
	const { projectName } = router.query

	const publicationDate = 'January, 2024'

	return (
		<Layout projectName={projectName as string} publicationDate={publicationDate}>
			<div className={`${projectClasses.content}`}>
				The purpose of this project was to dive into ROS2 and Gazebo Ignition. I also wanted to learn C++. Due
				to budget restraints, I decided making it work in simulation would be a great start to making it a
				reality. To keep things simple, I used a scikit-learn model model over more complex approaches like
				reinforcement learning to get a better understanding of the simulation tools. This was the part I was
				most excited about was connecting a machine learning model to the robot and watching it perform.
			</div>

			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg border-[#121212] border-2"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/char-display.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<br />

			<div className={`${projectClasses.content}`}>
				<div>
					The purpose of this project was to dive into ROS2 and Gazebo Ignition. I also wanted to learn C++.
					Due to budget restraints, I decided making it work in simulation would be a great start to making it
					a reality. To keep things simple, I used a scikit-learn model model over more complex approaches
					like reinforcement learning to get a better understanding of the simulation tools. This was the part
					I was most excited about was connecting a machine learning model to the robot and watching it
					perform.
				</div>{' '}
				<div>
					There was not much sources that were up-to-date, but I found this course on Udemy by ___ to be
					extremely helpful. Most of the course was up-to-date (which was hard to find since ROS2 and Gazebo
					are constantly updating) in visually guiding me. You should be able to learn the basics of topics,
					subscribers, packages, etc.
				</div>
				<div>
					I highly recommend learning how to do all of these first before creating something your own or
					mimicking my code as it will provide a much better understanding! I won&apos;t go over the basics
					and will go straight into describing how I created model, worlds, topics, subscribers.{' '}
				</div>
				<div>I also used a lot of ___ code and modified it to my world/model, check out his repo!</div>
				<div>
					If you want to dive more into my code, check it out here! Other than that, let&apos;s get started!
					here are the files I&apos;ll focus on in the repo:
				</div>
				<ul>
					<li>• char_01_model.sdf</li>
					<li>• char_01_world.sdf</li>
					<li>• lidar_node</li>
					<li>• visualize.py</li>
					<li>• train_model.py</li>
					<li>• predict.py</li>
					<li>• control.cpp</li>
				</ul>
			</div>

			<br />

			<h2 id="model design" className={`${projectClasses.subheading}`}>
				Model Design
			</h2>

			<div className={`${projectClasses.content}`}>
				As shown in my CAD drawing, I attempted to mimic its shape in Gazebo Ignition. I couldn&apos;t convert
				it to URDF for some reason and figured it was quicker to create it in an SDF file since it consisted of
				simple shapes, you can the code for this here!
			</div>

			<br />
			<Image
				src="/images/char-01.png"
				alt=""
				width={1000}
				height={1000}
				layout="responsive"
				className={`${projectClasses.image}`}
			/>

			<br />

			<div className={`${projectClasses.content}`}>
				<div>
					Keep in mind, we need to connect model to the /cmd_vel topic into the `char_01_model.sdf` file.
					`/cmd_vel` topic usually carries messages of type `geometry_msgs/Twist`, which contain fields for
					linear (`x`, `y`, `z`) and angular (`x`, `y`, `z`) velocities. In a typical scenario, a ROS node
					controlling the robot&apos;s movement will subscribe to this topic and translate the received
					velocity commands into motor commands to drive the robot&apos;s wheels or tracks.
				</div>
				<div>Here, we implemented the diff drive system in the char-01-model file.</div>
			</div>

			<br />

			<CodeHighlight
				code={`${char_model}`}
				language="text"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />

			<h2 id="structure" className={`${projectClasses.subheading}`}>
				World Design
			</h2>
			<div className={`${projectClasses.content}`}>
				As for the model world, I created an SDF file in the worlds folder and connected four walls in neon blue
				to contain the CHAR 01 robot. We also added a sun. Code is here.
			</div>
			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg border-[#121212] border-2"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/char-01-walls.mov" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<br />

			<div className={`${projectClasses.content}`}>
				<h2 id="lidar node" className={`${projectClasses.subheading}`}>
					LiDAR Node
				</h2>
				<div className={`${projectClasses.content}`}>
					I used this tutorial in{' '}
					<Link
						className={projectClasses.underline}
						href="https://docs.ros.org/en/humble/Tutorials/Advanced/Simulators/Gazebo/Gazebo.html?highlight=lidar"
					>
						ROS2 Documentation: Humble
					</Link>{' '}
					in order to get a feel of what visualizing lidar sensor is like. This C++ code defines a ROS2 node
					for a LiDAR sensor.
				</div>
			</div>

			<br />
			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg border-[#121212] border-2"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/char-01-lidar.mov" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<br />

			<CodeHighlight
				code={`${lidar_libs}`}
				language="cpp"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />

			<div className={`${projectClasses.content}`}>
				This class inherits from rclcpp::Node, which is a base class for ROS2 nodes. In the constructor, the
				node is named "lidar_node". It creates a subscription that listens to sensor_msgs::msg::LaserScan
				messages on the "lidar" topic. The callback function for this subscription is LidarNode::callback.
			</div>

			<br />

			<CodeHighlight
				code={`${lidar_constructor}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />

			<div className={`${projectClasses.content}`}>
				This function is called whenever a new LaserScan message is received. It writes the range readings to a
				file.
			</div>
			<br />

			<CodeHighlight
				code={`${lidar_callback}`}
				language="cpp"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />
			<div className={`${projectClasses.content}`}>
				This function initializes the ROS2 system, spins the LidarNode (i.e., starts the node and keeps it
				running to process callbacks), and then shuts down the ROS2 system when the node stops.
			</div>
			<br />

			<CodeHighlight
				code={`${lidar_main}`}
				language="cpp"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />
			<div className={`${projectClasses.content}`}>
				In this version of lidar_node.cc, the LidarNode only subscribes to LaserScan messages and writes the
				range readings to a file. Make sure u add the new lidar_node to your CMakeLists.txt file when building
				your package!{' '}
			</div>

			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg border-[#121212] border-2"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/char-01-rviz.mov" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<br />
			<h2 id="collect data" className={`${projectClasses.subheading}`}>
				Collect Data
			</h2>
			<div className={`${projectClasses.content}`}>
				<div>
					Now, you could manually control the robot with the lidar sensor in order to gather simulation...
					However, that would be time-consuming, and why do that when ___ already did this for us?
				</div>
				<div>
					In his repo, I snatched the all.txt data, visualize.py, train_model, and predict,py files and
					altered them to fit my project. In his all.txt data, at the end of each row generated by the sensor,
					it consists of one of these letters:
				</div>
			</div>
			<div className={`${projectClasses.content}`}>
				<ul>
					<li>• F - Forward</li>
					<li>• I - Forward Right</li>
					<li>• R - Right</li>
					<li>• G - Forward Left</li>
					<li>• L - Left</li>
				</ul>
			</div>
			<br />

			<h2 id="visualize data" className={`${projectClasses.subheading}`}>
				Visualize Data
			</h2>
			<div className={`${projectClasses.content}`}>
				At a high level, this script visualizes LiDAR sensor data. It reads data from a file, processes it, and
				for each set of data that matches the LiDAR resolution, it generates a polar plot.
			</div>

			<br />
			<Image
				src="/images/char-01-plot.png"
				alt=""
				width={1000}
				height={1000}
				layout="responsive"
				className={`${projectClasses.image}`}
			/>

			<br />
			<div className={`${projectClasses.content}`}>
				Each data point is represented as a black dot, and an additional orange dot is plotted at the center of
				the plot the orange dot plotted at the coordinates (400, 400) representing the location of the LiDAR
				sensor or the robot model itself in the visualization. The plot is then displayed to the user.
			</div>
			<br />

			<CodeHighlight
				code={`${visualize}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />
			<h2 id="train model" className={`${projectClasses.subheading}`}>
				Train Model
			</h2>
			<div className={`${projectClasses.content}`}>
				<div>
					This Python script performs a machine learning workflow, where it first preprocesses and encodes a
					dataset, then selects key features for training a Random Forest Classifier.
				</div>
				<div>
					After training, the model&apos;s accuracy is evaluated and the model, along with its components, is
					saved for future use. This end-to-end process encompasses data preparation, model training,
					evaluation, and serialization, making it a comprehensive solution for a classification task.
				</div>
				<div>
					The script reads the all.txt file and loads it into a pandas DataFrame. The data is assumed not to
					have a header row.
				</div>
			</div>
			<br />

			<CodeHighlight
				code={`${train_load}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />
			<div className={`${projectClasses.content}`}>
				Here, the script renames the last column to 'Label' and filters out rows with specific labels ('L', 'R',
				'H', 'J'). It then splits the data into features (`X`) and labels (`y`).
			</div>
			<br />

			<CodeHighlight
				code={`${train_preprocessing}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />
			<div className={`${projectClasses.content}`}>
				The `LabelEncoder` is used to convert categorical labels into a numeric format.
			</div>
			<br />

			<CodeHighlight
				code={`${train_encode}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />
			<div className={`${projectClasses.content}`}>
				The dataset is divided into training and testing sets, with 20% of the data reserved for testing.{' '}
			</div>
			<br />

			<CodeHighlight
				code={`${train_split}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />
			<div className={`${projectClasses.content}`}>
				The script selects the top 80 features using ANOVA F-value as the score function. The indices of these
				features are printed.{' '}
			</div>
			<br />

			<CodeHighlight
				code={`${train_feature}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />

			<div className={`${projectClasses.content}`}>
				A Random Forest Classifier is trained on the selected features of the training set.{' '}
			</div>
			<br />

			<CodeHighlight
				code={`${train_train}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />

			<div className={`${projectClasses.content}`}>
				The model makes predictions on the test set, and the script evaluates its performance by calculating the
				accuracy and generating a classification report.{' '}
			</div>
			<br />

			<CodeHighlight
				code={`${train_predictions}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />

			<div className={`${projectClasses.content}`}>
				Finally, the trained Random Forest model, the `SelectKBest` object, and the `LabelEncoder` are saved to
				files for future use.{' '}
			</div>
			<br />

			<CodeHighlight
				code={`${train_save}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />

			<div className={`${projectClasses.content}`}>
				As seen below, we reach an accuracy of around ~67 percent!
			</div>

			<br />
			<Image
				src="/images/char-01-train.png"
				alt=""
				width={1000}
				height={1000}
				layout="responsive"
				className={`${projectClasses.image}`}
			/>

			<br />

			<h2 id="Predictions" className={`${projectClasses.subheading}`}>
				Predictions
			</h2>
			<div className={`${projectClasses.content}`}>
				<div>
					This script defines a ROS 2 (Robot Operating System) node in Python for making predictions based on
					LiDAR data using a trained machine learning model, specifically a Random Forest Classifier.
					Here&apos;s a breakdown of its functionality:
				</div>
				<div>
					The Predictor class is a custom ROS2 node. It subscribes to the 'lidar' topic, loads a trained
					model, a feature selector, and a label encoder, and publishes predictions to the 'prediction' topic.
				</div>
				<div>
					The joblib.load function is used to load the trained Random Forest model from a file. The loaded
					model is stored in self.clf.
				</div>
				<div>
					The joblib.load function is also used to load the feature selector from a file. The loaded feature
					selector is stored in self.k_best.
				</div>
				<div>
					The joblib.load function is also used to load the feature selector from a file. The loaded feature
					selector is stored in self.k_best.
				</div>
				<div>
					Similarly, the joblib.load function is used to load the label encoder from a file. The loaded label
					encoder is stored in self.label_encoder.
				</div>
			</div>
			<br />
			<CodeHighlight
				code={`${predict_load}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />

			<div className={`${projectClasses.content}`}>
				<div>
					The listener_callback method is called whenever a new message is published on the 'lidar' topic. It
					preprocesses the data, makes a prediction using the trained model, and publishes the prediction.
				</div>
			</div>

			<br />
			<CodeHighlight
				code={`${predict_callback}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />

			<div className={`${projectClasses.content}`}>
				<div>
					The preprocess_data method is used to preprocess the LiDAR data before it's passed to the machine
					learning model for prediction.
				</div>
			</div>

			<br />
			<CodeHighlight
				code={`${predict_preprocess}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />

			<div className={`${projectClasses.content}`}>
				<div>
					While the script is running, it will keep making predictions every time a new message is published
					on the 'lidar' topic, and it will only shut down when the ROS2 system is shut down.
				</div>
			</div>

			<br />
			<CodeHighlight
				code={`${predict_main}`}
				language="py"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />

			<h2 id="control node" className={`${projectClasses.subheading}`}>
				Control Node
			</h2>
			<div className={`${projectClasses.content}`}>
				<div>
					This C++ file, control.cpp, defines a node that listens for predictions and publishes corresponding
					Twist messages to control a robot. Here&apos;s a breakdown of its components:
				</div>
				<div>
					The constructor for ControlNode initializes the node with the name "control_node", creates a
					publisher that publishes geometry_msgs::msg::Twist messages on the "cmd_vel" topic, and creates a
					subscription that listens for std_msgs::msg::String messages on the "prediction" topic.
				</div>
			</div>
			<br />
			<CodeHighlight
				code={`${control_class}`}
				language="cpp"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />

			<div className={`${projectClasses.content}`}>
				The callback function is called whenever a new message is received on the "prediction" topic. It
				converts the prediction from a string to an integer, creates a geometry_msgs::msg::Twist message based
				on the prediction, and publishes this message on the "cmd_vel" topic.
			</div>

			<br />
			<CodeHighlight
				code={`${control_callback}`}
				language="cpp"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />

			<div className={`${projectClasses.content}`}>
				The main function initializes the ROS2 system, creates a ControlNode, spins the node to process
				callbacks, and then shuts down the ROS2 system when the node is done.
			</div>

			<br />
			<CodeHighlight
				code={`${control_main}`}
				language="cpp"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>
			<br />

			<h2 id="launch file" className={`${projectClasses.subheading}`}>
				Launch
			</h2>

			<div className={`${projectClasses.content}`}>
				<div>
					Finally, a launch file is created to start a simulation environment and several ROS2 nodes for a
					robotic system.
				</div>
				<div>At a high level, it does the following:</div>
				<div>
					<ul>
						<li>1. Starts the Ignition Gazebo simulator with a specific world file. </li>
						<li>
							2. Launches a node (predict_node) that uses a machine learning model to make predictions
							based on LiDAR data.{' '}
						</li>
						<li>
							3. Launches a node (control_node) for controlling the robot (the specifics of what this node
							does aren't provided in the launch file).{' '}
						</li>
						<li>
							4. Launches a node (lidar_node) for handling LiDAR data (the specifics of what this node
							does aren't provided in the launch file).{' '}
						</li>
						<li>
							5. Sets up bridges between ROS2 and Ignition Gazebo for the /lidar and /cmd_vel topics,
							allowing ROS2 nodes to interact with the simulator.{' '}
						</li>
					</ul>
				</div>
			</div>

			<br />
			<CodeHighlight
				code={`${launch}`}
				language="text"
				copyLabel="Copy code"
				copiedLabel="Copied!"
				className={`${projectClasses.code}`}
			/>

			<br />

			<div className={`${projectClasses.content}`}>
				<div>Look at CHAR 01 go!</div>
			</div>

			<br />

			<video
				autoPlay
				loop
				muted
				playsInline
				// className="w-full h-full rounded-lg border-[#121212] border-2"
				className="w-full h-full rounded-lg border-[#121212] border-2"
			>
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/char-01-final.mov" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<br />

			<h2 id="learnings" className={`${projectClasses.subheading}`}>
				Learnings
			</h2>
			<div className={`${projectClasses.content}`}>
				<div>
					In essence, this launch file sets up a complete system for simulating, controlling, and making
					predictions for a robot using ROS2 and Ignition Gazebo.
				</div>
				<div>
					Now you need to build the package, source it, then run the launch file to get the simulation
					started! The model sometimes pauses to try and predict its next move. As you can see, the model is
					not the best, and there are definitely some tweaks that could be made. But I&apos;m super proud with
					the dent I made in ROS2, Gazebo, and C++.
				</div>
			</div>
		</Layout>
	)
}

export default Project
