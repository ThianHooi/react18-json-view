import { writeText } from '@/lib/clipboard'
import clsx from 'clsx'
import hljs from 'highlight.js/lib/core'
import { useState } from 'react'
import JsonView from 'react18-json-view'
import CopySVG from '@/svgs/copy.svg'
import CopiedSVG from '@/svgs/copied.svg'

type Option = 'true' | 'false'
const options: Option[] = ['true', 'false']

const valueMap: Record<Option, boolean> = {
	true: true,
	false: false
}

export default function DisplayArrayIndex() {
	const [selected, setSelected] = useState(options[0])

	const code = `<JsonView src={json_object} displayArrayIndex={${selected}} />`

	const [copied, setCopied] = useState(false)

	const copy = () => {
		writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const highlightedCode = hljs.highlight(code, { language: 'js' }).value

	return (
		<>
			<h2 className='mt-20 text-lg font-medium'>Display Array Index (Canary)</h2>
			<ul className='mt-3 flex select-none flex-wrap gap-1'>
				{options.map(item => (
					<li
						key={item}
						className={clsx(
							'min-w-[32px] cursor-pointer rounded-lg border px-2 py-1 text-center',
							selected === item && 'bg-slate-200 dark:bg-slate-600'
						)}
						onClick={() => setSelected(item)}>
						{item}
					</li>
				))}
			</ul>

			<div className='relative'>
				<code className='my-3 flex items-center justify-between overflow-auto rounded-lg border bg-slate-50 p-4 text-sm dark:bg-slate-800 dark:text-white/80'>
					<pre
						dangerouslySetInnerHTML={{
							__html: highlightedCode
						}}
					/>
				</code>
				<button onClick={copy} className='absolute right-4 top-3 rounded-lg border bg-white/20 p-1 backdrop-blur'>
					{copied ? <CopiedSVG className='h-5 w-5' /> : <CopySVG className='h-5 w-5' />}
				</button>
			</div>

			<div className='mt-2 rounded-lg border bg-white p-4 text-sm dark:bg-[#0E0832]'>
				<JsonView
					displayArrayIndex={valueMap[selected]}
					src={{
						string: 'string',
						number: 123456,
						boolean: false,
						null: null,
						func: function () {},
						Symbol: Symbol('JSON View'),
						obj: {
							k1: 123,
							k2: '123',
							k3: false,
							nest: {
								nest: {
									nest: {
										over: 'over'
									}
								}
							}
						},
						arr: ['string', 123456, false, ['nest', ['over']]]
					}}
				/>
			</div>
		</>
	)
}
