// pages/projects/degen.tsx
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout, { projectClasses } from 'src/pages/projects/layout'
import '@mantine/code-highlight/styles.css';
import { CodeHighlight } from '@mantine/code-highlight';
import { CodeHighlightTabs } from '@mantine/code-highlight';



const Project = () => {


const exampleCode = `
function Button() {
  return <button>Click me</button>;
}
`;

	
	const router = useRouter()
	const { projectName } = router.query

	const publicationDate = 'September, 2023'

	return (
		<Layout projectName={projectName as string} publicationDate={publicationDate}>
			<h2 id="hello" className={`${projectClasses.subheading}`}>
				WIP!!!
			</h2>

			<>
      <CodeHighlight
        code={`// Custom copy label${exampleCode}`}
        language="tsx"
        copyLabel="Copy button code"
        copiedLabel="Copied!"
      />
      <CodeHighlight
        code={`// Without copy button${exampleCode}`}
        language="tsx"
        withCopyButton={false}
        mt="md"
      />
    </>

			<div>
				The graph is an svg element. And the rounded indicator itself has offset-path defined with the same path
				definition that renders the graph stroke. Basically, this property enables moving an element along a
				given path. For brevity, some details are omitted but here is the general idea.
			</div>

			<video autoPlay loop muted playsInline className={`${projectClasses.video}`}>
				<source src={'/images/scaleai.mov'} type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			<div>More project details can be displayed here.</div>
			<h2 id="time-when-i-poo" className={`${projectClasses.subheading}`}>
				Time when I poo
			</h2>
			<div>
				The graph is an svg element. And the rounded indicator itself has offset-path defined with the same path
				definition that renders the graph stroke. Basically, this property enables moving an element along a
				given path. For brevity, some details are omitted but here is the general idea.
			</div>
			<h2 id="chicken-review" className={`${projectClasses.subheading}`}>
				Chicken Review
			</h2>
			<div>
				The graph is an svg element. And the rounded indicator itself has offset-path defined with the same path
				definition that renders the graph stroke. Basically, this property enables moving an element along a
				given path. For brevity, some details are omitted but here is the general idea.
			</div>
		</Layout>
	)
}

export default Project
