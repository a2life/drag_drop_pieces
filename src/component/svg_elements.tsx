import {renderToString} from 'preact-render-to-string';


export const Dot = (prop: { x: number, y: number, r: number }) => {
    return <circle cx={prop.x} cy={prop.y} r={prop.r} fill="gray"/>
}

const Grid = () => {
    return (<>
            <line x1={0} y1={40} x2={120} y2={40} style="stroke:black; stroke-width:1px;"/>
            <line x1={0} y1={80} x2={120} y2={80} style="stroke:black; stroke-width:1px;"/>
            <line x1={40} y1={0} x2={40} y2={120} style="stroke:black; stroke-width:1px;"/>
            <line x1={80} y1={0} x2={80} y2={120} style="stroke:black; stroke-width:1px;"/>

        </>
    )

}

const Arrow = (prop: { a: string }) => {
    const transformer = {
        "n": "translate(60,20)",
        "ne": "translate(100,20) rotate(45)",
        "e": "translate(100,60) rotate(90)",
        "se": "translate(100,100) rotate(135)",
        "s": "translate(60,100) rotate(180)",
        "nw": "translate(20,20) rotate(-45)",
        "w": "translate(20,60) rotate(-90)",
        "sw": "translate(20,100) rotate(-135)"
    }

    const path = "M -8 20 h 16 v -20 h 7 l -15 -20 l -15 20 h 7 Z"

    return <path d={path} style="fill:gray" transform={transformer[prop.a as keyof typeof transformer]}/>
}
const x1 = 20, x2 = 60, x3 = 100, y1 = 20, y2 = 60, y3 = 100;


const patterns = {
    1: {x: x1, y: y1}, 2: {x: x2, y: y1}, 3: {x: x3, y: y1},
    4: {x: x1, y: y2}, 5: {x: x2, y: y2}, 6: {x: x3, y: y2},
    7: {x: x1, y: y3}, 8: {x: x2, y: y3}, 9: {x: x3, y: y3}

}

const pieces = {
    'P': [2],
    'P+': [1, 2, 3, 4, 6, 8],
    'L': ['n'],
    'L+': [1, 2, 3, 4, 6, 8],
    'N': [1, 3],
    'N+': [1, 2, 3, 4, 6, 8],
    'S': [1, 2, 3, 7, 9],
    'S+': [1, 2, 3, 4, 6, 8],
    'G': [1, 2, 3, 4, 6, 8],
    'R': ['n', 'e', 'w', 's'],
    'R+': ["n", "s", "w", "e", 1, 3, 7, 9],
    'B': ['ne', 'nw', 'se', 'sw'],
    'B+': [2, 4, 6, 8, 'ne', 'nw', 'se', 'sw'],
    'K': [1, 2, 3, 4, 6, 7, 8, 9],
    "K'": [1, 2, 3, 4, 6, 7, 8, 9]
}


const renderSVG = (title: string) => {
    const x_offset = (title.length == 1) ? 48 : 40
    return (
        (<svg width={120} height={120} fill="none" xmlns="http://www.w3.org/2000/svg">
                <Grid/>
                <text x={x_offset} y={title == "N" ? 110 : 70} fill="darkgray" font-size={30}
                      font-weight={700}>{title}</text>
                {pieces[title as keyof typeof pieces].map((i) => {
                    const source = patterns[i as keyof typeof patterns]
                    if ("12346789".includes(String(i))) return <Dot x={source.x} y={source.y} r={15}/>
                    else return <Arrow a={i as string}/>
                })}
            </svg>
        )
    )
}

const title = {
    'fu': "P",
    'to': "P+",
    'kyo': "L",
    'nkyo': "L+",
    'kei': "N",
    'nkei': "N+",
    'gin': "S",
    'ngin': "S+",
    'kin': "G",
    'kaku': "B",
    'uma': "B+",
    'hi': "R",
    'ryu': "R+",
    'ou': "K",
    'gyoku': "K'",
}

export const SVGImage = (p: string) => {
    console.log('Requested SVG', p)
    return "data:image/svg+xml;uft-8," + (renderToString(renderSVG(title[p as keyof typeof title])))
}

