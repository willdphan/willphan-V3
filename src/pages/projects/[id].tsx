import Layout from 'src/pages/projects/layout'
import { useRouter } from 'next/router'
// pages/project/[id].tsx
import { projects } from 'src/components/Projects' // Assuming that projects.tsx is in the same folder

export default function Project({ projectName, publicationDate }) {
	return (
		<Layout projectName={projectName as string} publicationDate={publicationDate}>
			{/* Pass an empty fragment as children */}
			<></>
		</Layout>
	)
}

export async function getStaticProps({ params }) {
	const project = projects.find(p => p.name.toLowerCase() === params.id)
	if (!project) {
		return {
			notFound: true,
		}
	}
	return { props: { project } }
}

export async function getStaticPaths() {
	const paths = projects.map(project => ({
		params: { id: project.name.toLowerCase() },
	}))
	return { paths, fallback: false }
}
