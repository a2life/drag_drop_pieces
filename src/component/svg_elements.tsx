import {renderToString} from 'preact-render-to-string';


export const Dot = (prop: { x: number, y: number, r: number }) => {
    return <circle cx={prop.x} cy={prop.y} r={prop.r} fill="gray"/>
}

export const Grid = () => {
    return (<>
            <line x1={0} y1={39} x2={120} y2={39} style="stroke:black; stroke-width:1px;"/>
            <line x1={0} y1={79} x2={120} y2={79} style="stroke:black; stroke-width:1px;"/>
            <line x1={39} y1={0} x2={39} y2={120} style="stroke:black; stroke-width:1px;"/>
            <line x1={79} y1={0} x2={79} y2={120} style="stroke:black; stroke-width:1px;"/>
        {/*    <line x1={119} y1={0} x2={119} y2={119} style="stroke:black; stroke-width:1px" />*/}
        </>
    )

}

export const Arrow = (prop: { a:string }) => {
    const transformer={
        "n": "translate(59,19)",
        "ne":"translate(99,19) rotate(45)",
        "e":"translate(99,59) rotate(90)",
        "se":"translate(99,99) rotate(135)",
        "s":"translate(59,99) rotate(180)",
        "nw":"translate(19,19) rotate(-45)",
        "w":"translate(19,59) rotate(-90)",
        "sw":"translate(19,99) rotate(-135)"
    }

    const path ="M -10 20 h 20 v -20 h 5 l -15 -20 l -15 20 h 5 Z"

    return <path d={path} style="fill:gray" transform={transformer[prop.a as keyof typeof transformer]}/>
}
const x1 = 20, x2 = 60, x3 = 100, y1=20, y2=60, y3=100;


const patterns ={
    1:{x:x1, y:y1}, 2: {x:x2, y:y1}, 3:{x:x3,y:y1},
    4:{x:x1,y:y2}, 5:{x:x2,y:y2},6:{x:x3,y:y2},
    7:{x:x1,y:y3}, 8:{x:x2,y:y3},9:{x:x3,y:y3}

}

const pieces={'P':[2], 'P+':[1,2,3,4,6,8], 'L':['n'], 'L+':[1,2,3,4,6,8],'N':[1,3],'N+':[1,2,3,4,6,8],
    'S':[1,2,3,7,9],'S+':[1,2,3,4,6,8],'G':[1,2,3,4,6,8],'R':['n','e','w','s'],'R+':["n","s","w","e",1,3,7,9],
    'B':['ne','nw','se','sw'],'B+':[2,4,6,8,'ne','nw','se','sw'], 'K':[1,2,3,4,6,7,8,9],"K'":[1,2,3,4,6,7,8,9]}


const renderSVG =(title:string)=> {
    const x_offset = (title.length == 1) ? 48 : 40
    return (
        (<svg width={120} height={120} fill="none" xmlns="http://www.w3.org/2000/svg" >
                <Grid/>
                <text x={x_offset} y={title=="N"?110:70} fill="darkgray" font-size={30} font-weight={700}>{title}</text>
            {pieces[title as keyof typeof pieces].map((i)=>{
                const source=patterns[i as keyof typeof patterns]
                if ("12346789".includes(String(i))) return  <Dot x={source.x} y={source.y} r={15}/>
                else return <Arrow a={i as string} />
            })}
            </svg>
        )
    )
}

const title={
    'fu':"P",
    'to':"P+",
    'kyo':"L",
    'nkyo':"L+",
    'kei':"N",
    'nkei':"N+",
    'gin':"S",
    'ngin':"S+",
    'kin':"G",
    'kaku':"B",
    'uma':"B+",
    'hi':"R",
    'ryu':"R+",
    'ou':"K",
    'gyoku':"K'",
}

export const PathImage=(p:string)=>{
    console.log('Requested SVG', p)
    return "data:image/svg+xml;uft-8,"+(renderToString(renderSVG(title[p as keyof typeof title])))
}

