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
	std::string file_path = ".../char-01/ros2_pkg/data";
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
joblib.dump(clf, '...data/rf_model/path_to_random_forest_model.pkl')
joblib.dump(k_best, '...data/k_best/path_to_k_best.pkl')
joblib.dump(label_encoder, '.../data/label_encoder/path_to_label_encoder.pkl')
`
	const predict_load = `
self.clf = joblib.load(
	'.../data/rf_model/random_forest_model.pkl')
self.k_best = joblib.load(
	'.../data/k_best/k_best.pkl')
self.label_encoder = joblib.load(
	'.../data/label_encoder/label_encoder.pkl')
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
	cmd=['ign', 'gazebo', '.../worlds/char_01_world.sdf'],
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
				<div>
					The purpose of this project was to dive into ROS2 and Gazebo Ignition. I also wanted to learn how to
					design a robot in CAD and program it using C++. Because I&apos;m broke, I decided making it work in
					simulation would be a great start to making it a reality. To keep things simple, I used a
					scikit-learn model model over more complex approaches like reinforcement learning to get a better
					understanding of the simulation tools. This was the part I was most excited about was connecting a
					machine learning model to the robot and watching it perform.
				</div>
				<div>
					Below is a CAD render of CHAR 01 in Fusion360. I like to keep it simple and minimal. Hopefully
					I&apos;ll use my school 3D printers to print this bad boy out, praying that I can get free filament.{' '}
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
				<source src="https://pub-33c643825c664d0091b84d7ae37a5150.r2.dev/char-display.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<br />

			<div className={`${projectClasses.content}`}>
				<div>
					The aim of this project was to explore ROS2 and Gazebo Ignition, coupled with an opportunity to
					enhance my C++ skills. Operating within a limited budget, I chose to develop the project in a
					simulation environment as a practical and cost-effective approach towards eventual real-world
					application. Opting for simplicity and clarity, I utilized a scikit-learn model instead of delving
					into more intricate methods such as reinforcement learning. This decision was driven by the desire
					to gain a solid grasp of simulation tools. The highlight and most exhilarating aspect for me was
					integrating a machine learning model with the robot and observing its performance in action.
				</div>{' '}
				<div>
					Finding current resources for ROS2 and Gazebo was quite a task, given how often they&apos;re
					updated. But I hit the jackpot with this cool course on{' '}
					<Link
						className={projectClasses.underline}
						href="https://www.udemy.com/course/ros2-cpp-robotics-developer-course/"
					>
						Udemy by Raymond Andrade.
					</Link>{' '}
					It really hit the mark in terms of staying current, which is a tall order in this field.
					Raymond&apos;s course was a big help, especially with its clear, visual explanations. It&apos;s got
					everything to get you started - like ROS2 subscribers and packages. Definitely a solid pick for
					anyone diving into these techs for the first time.
				</div>
				<div>
					If you don&apos;t understand the basics, I definitely suggest getting a handle on the basics first
					before diving into creating your own stuff or even trying to follow my code. It&apos;ll give you a
					way better understanding of how everything fits together. I&apos;m going to skip the beginner stuff
					and jump right into the cool parts - like how I built the model, crafted the worlds, and set up the
					topics and subscribers. It&apos;s more fun that way!
				</div>
				<div>
					For a similar project using an Arduino, check out{' '}
					<Link className={projectClasses.underline} href="https://youtu.be/PdSDhdciSpE?si=lA5s7GLW5RZzkDLo">
						Niko Dembartnik.
					</Link>{' '}
					I used a lot of his code and modified it to my simulation, check out his repo!
				</div>
				<div>
					If you want to dive more into my code, check out the repo
					<Link className={projectClasses.underline} href="https://github.com/willdphan/char-01.git">
						here!
					</Link>{' '}
					Other than that, let&apos;s get started! Here are the files I&apos;ll focus on in the repo:
				</div>
				<ul>
					<li>
						• <Code>char_01_model.sdf</Code>
					</li>
					<li>
						• <Code>char_01_world.sdf</Code>
					</li>
					<li>
						• <Code>lidar_node</Code>
					</li>
					<li>
						• <Code>visualize.py</Code>
					</li>
					<li>
						• <Code>train_model.py</Code>
					</li>
					<li>
						• <Code>predict.py</Code>
					</li>
					<li>
						• <Code>control.cpp</Code>
					</li>
				</ul>
			</div>

			<br />

			<h2 id="model design" className={`${projectClasses.subheading}`}>
				Model Design
			</h2>

			<div className={`${projectClasses.content}`}>
				As shown in my CAD drawing, I attempted to mimic its shape in Gazebo Ignition. I couldn&apos;t convert
				it to URDF for some reason and figured it was quicker to create it in an SDF file since it consisted of
				simple shapes, you can the code for this here! Here&apos;s the CHAR 01 look-alike next to a sick Hummer.
				It&apos;s a little big, but it&apos;ll do.
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
					Keep in mind, we need to connect model to the <Code>/cmd_vel topic</Code> into the{' '}
					<Code>char_01_model.sdf</Code> file.
					<Code>/cmd_vel</Code> topic usually carries messages of type <Code>geometry_msgs/Twist</Code>, which
					contain fields for linear <Code>(x, y, z)</Code> and angular <Code> (x, y, z)</Code> velocities. In
					a typical scenario, a ROS node controlling the robot&apos;s movement will subscribe to this topic
					and translate the received velocity commands into motor commands to drive the robot&apos;s wheels or
					tracks.
				</div>
				<div>
					Here, we implemented the diff drive system plugin in the <Code>char-01-model.sdf</Code> file.
				</div>
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
					in order to get a feel of what visualizing lidar sensor is like. The tutorial makes it easy to run a
					pre-made world with a lidar model so check it out! Afterwards, I developed this ROS2 node in C++ for
					a LiDAR sensor shown later below.
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

			<div className={`${projectClasses.content}`}>
				Overall, the class inherits from <Code>rclcpp::Node</Code>, which is a base class for ROS2 nodes. In the
				constructor, the node is named <Code>lidar_node</Code>. It creates a subscription that listens to{' '}
				<Code>sensor_msgs::msg::LaserScan</Code>
				messages on the <Code>lidar</Code> topic. The callback function for this subscription is{' '}
				<Code>LidarNode::callback</Code>.
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
				Within the class, this function is called whenever a new <Code>LaserScan</Code> message is received. It
				writes the range readings to a file.
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
				This function initializes the ROS2 system, spins the <Code>LidarNode</Code> (i.e., starts the node and
				keeps it running to process callbacks), and then shuts down the ROS2 system when the node stops.
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
				In this version of <Code>lidar_node.cc</Code>, the <Code>LidarNode</Code> only subscribes to{' '}
				<Code>LaserScan</Code> messages and writes the range readings to a file. Make sure u add the new{' '}
				<Code>lidar_node</Code> to your <Code>CMakeLists.txt</Code> file when building your package!{' '}
			</div>

			<div className={`${projectClasses.content}`}>
				<div>
					After sourcing your bash file, you can go into terminal and type <Code>rviz2</Code> for another
					window to pop up. In the window, you can configure the &quot;Fixed Frame&quot;. I entered{' '}
					<Code>vehicle_blue/chassis/gpu_lidar</Code> but this may vary depending how you set up your model.
				</div>

				<div>And then click in the button &quot;Add&quot; to include a display to visualize the lidar</div>
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
					You could manually control the robot with the lidar sensor in order to gather data from the
					simulation but... that would be time-consuming, and why do that when{' '}
					<Link
						className={projectClasses.underline}
						href="https://indystry.cc/machine-learning-robot-driving-autonomously-with-arduino-and-lidar/"
					>
						Niko
					</Link>{' '}
					already did this for us?
				</div>
				<div>
					In his repo, I snatched the <Code>all.txt</Code> data, <Code>visualize.py</Code>,{' '}
					<Code>train_model.py</Code>, and <Code>predict.py</Code> files and altered them to fit my project.
					In his <Code>all.txt</Code> data, the end of each row generated by the sensor consists of one of
					these letters:
				</div>
			</div>
			<div className={`${projectClasses.content}`}>
				<div>
					<ul>
						<li>
							• <Code>F - Forward</Code>
						</li>
						<li>
							• <Code>I - Forward Right</Code>
						</li>
						<li>
							• <Code>R - Right</Code>
						</li>
						<li>
							• <Code>G - Forward Left</Code>
						</li>
						<li>
							• <Code>L - Left</Code>
						</li>
					</ul>
				</div>
				<div>
					These letters are used to label the sensor data with the corresponding movement or direction, which
					is crucial for training a model to understand and predict movements based on sensor inputs.
				</div>
			</div>
			<br />

			<h2 id="visualize data" className={`${projectClasses.subheading}`}>
				Visualize Data
			</h2>
			<div className={`${projectClasses.content}`}>
				At a high level, the <Code>visualize.py</Code> script visualizes LiDAR sensor data. It reads data from
				the <Code>all.txt</Code> file, processes it, and for each set of data that matches the LiDAR resolution,
				it generates a polar plot.
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
				the plot the orange dot plotted at the coordinates <Code>(400, 400)</Code> representing the location of
				the LiDAR sensor or the robot model itself in the visualization. The plot is then displayed to the user.
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
					This <Code>train_model.py</Code> script performs a machine learning workflow, where it first
					preprocesses and encodes a dataset, then selects key features for training a{' '}
					<Link
						className={projectClasses.underline}
						href="https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html"
					>
						Random Forest Classifier.
					</Link>
				</div>
				<div>
					After training, the model&apos;s accuracy is evaluated and the model, along with its components, is
					saved for future use. This end-to-end process encompasses data preparation, model training,
					evaluation, and serialization, making it a comprehensive solution for a classification task.
				</div>
				<div>
					The script reads the <Code>all.txt</Code> file and loads it into a pandas DataFrame.
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
				Here, the script renames the last column to &quot;Label&quot; and filters out rows with specific labels{' '}
				<Code>(L, R, H, J)</Code>. It then splits the data into features <Code>(X)</Code> and labels{' '}
				<Code>(y)</Code>.
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
				The <Code>LabelEncoder</Code> is used to convert categorical labels into a numeric format.
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
				Finally, the trained Random Forest model, the <Code>SelectKBest</Code> object, and the{' '}
				<Code>LabelEncoder</Code> are saved to files for future use.{' '}
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
				<div>
					This is the overall accuracy of the model, which is 66.69%. It tells you how often the model makes
					the correct prediction across all classes.
				</div>

				<div>
					From these results, you can infer that the model is better at correctly identifying forward
					movements <Code>(F)</Code> compared to left <Code>(G)</Code> or right <Code>(I)</Code> ones. The
					model is relatively precise when it predicts a movement as forward right <Code>(I)</Code>, but it
					doesn&apos;t recall them well (many forward right movements are missed), indicating an imbalance
					between precision and recall for this class. Either way, I&apos;ll just use this for now.
				</div>
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
					This <Code>predict.py</Code> defines a ROS2 node in Python for making predictions based on LiDAR
					data using a trained machine learning model, specifically a Random Forest Classifier.
				</div>
				<div>Here&apos;s a breakdown of its functionality:</div>
				<div>
					<ul>
						<li>
							• <Code>Predictor</Code> class is a custom ROS2 node. It subscribes to the{' '}
							<Code>lidar</Code> topic, loads a trained model, a feature selector, and a label encoder,
							and publishes predictions to the <Code>prediction</Code> topic.
						</li>
						<li>
							• <Code>joblib.load</Code> function is used to load the trained Random Forest model from a
							file. The loaded model is stored in <Code>self.clf</Code>.
						</li>
						<li>
							• <Code>joblib.load</Code> function is also used to load the feature selector from a file.
							The loaded feature selector is stored in <Code>self.k_best</Code>.
						</li>
						<li>
							• Similarly, the <Code>joblib.load</Code> function is used to load the label encoder from a
							file. The loaded label encoder is stored in <Code>self.label_encoder</Code>.
						</li>
					</ul>
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
					The <Code>listener_callback</Code> method is called whenever a new message is published on the{' '}
					<Code>lidar</Code> topic. It preprocesses the data, makes a prediction using the trained model, and
					publishes the prediction.
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
					The <Code>preprocess_data</Code> method is used to preprocess the LiDAR data before it&apos;s passed
					to the machine learning model for prediction.
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
					on the <Code>lidar</Code> topic, and it will only shut down when the ROS2 system is shut down.
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
					This C++ file, <Code>control.cpp</Code>, defines a node that listens for predictions and publishes
					corresponding Twist messages to control a robot.
				</div>
				<div>
					Its constructor for <Code>ControlNode</Code> initializes the node with the name{' '}
					<Code>control_node</Code>, creates a publisher that publishes <Code>geometry_msgs::msg::Twist</Code>{' '}
					messages on the <Code>cmd_vel</Code> topic, and creates a subscription that listens for{' '}
					<Code>std_msgs::msg::String</Code>
					messages on the <Code>prediction</Code> topic.
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
				The callback function is called whenever a new message is received on the <Code>prediction</Code> topic.
				It converts the prediction from a string to an integer, creates a <Code>geometry_msgs::msg::Twist</Code>{' '}
				message based on the prediction, and publishes this message on the <Code>cmd_vel</Code> topic.
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
				The main function initializes the ROS2 system, creates a <Code>ControlNode</Code>, spins the node to
				process callbacks, and then shuts down the ROS2 system when the node is done.
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
							2. Launches a node (<Code>predict_node</Code>) that uses a machine learning model to make
							predictions based on LiDAR data.{' '}
						</li>
						<li>
							3. Launches a node (<Code>control_node</Code>) for controlling the robot (the specifics of
							what this node does aren&apos;t provided in the launch file).{' '}
						</li>
						<li>
							4. Launches a node (<Code>lidar_node</Code>) for handling LiDAR data (the specifics of what
							this node does aren&apos;t provided in the launch file).{' '}
						</li>
						<li>
							5. Sets up bridges between ROS2 and Ignition Gazebo for the <Code>/lidar</Code> and{' '}
							<Code>/cmd_vel</Code> topics, allowing ROS2 nodes to interact with the simulator.{' '}
						</li>
					</ul>
				</div>
			</div>

			<br />

			<CodeHighlightTabs
				withExpandButton
				defaultExpanded={false}
				expandCodeLabel="Show full code"
				collapseCodeLabel="Show less"
				code={[{ fileName: 'char_01.launch.py', code: launch, language: 'text' }]}
			/>

			<br />

			<div className={`${projectClasses.content}`}>
				<div>The video is sped up 1.5x times... but look at CHAR 01 go! It&apos;s moving!</div>
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

			<div className={`${projectClasses.content}`}>
				In essence, this launch file sets up a complete system for simulating, controlling, and making
				predictions for a robot using ROS2 and Ignition Gazebo.
			</div>
			<br />
			<h2 id="what's next?" className={`${projectClasses.subheading}`}>
				What&apos;s Next?
			</h2>
			<div className={`${projectClasses.content}`}>
				<div>
					Now you need to build the package, source the <Code>setup.bash</Code>, then run the launch file to
					get the simulation started! The model sometimes pauses to try and predict its next move.
				</div>
				<div>
					As you can see, the model I&apos;ve created isn&apos;t perfect and there&apos;s definitely room for
					improvement. For instance, experimenting with different models might yield more efficient results.
					I&apos;m also thinking that incorporating reinforcement learning could be a game-changer, especially
					in terms of enabling CHAR 01 to better explore its environment.
				</div>
				<div>
					But hey, this project is just one step in my ongoing learning journey, and I&apos;m genuinely
					thrilled about what lies ahead.
				</div>
				<div>
					Overall, I&apos;m really proud of the progress I&apos;ve made with ROS2, Gazebo, and C++, and
					I&apos;m excited to continue exploring this field brimming with possibilities. Hope to update you
					all!
				</div>
			</div>
		</Layout>
	)
}

export default Project
