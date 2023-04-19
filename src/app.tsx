import {useState} from 'preact/hooks'

import {Shogi_piece_arr, komaSetArray} from "./component/koma_list";
import {imageArray} from "./component/imageArray";
import './app.css'
import {CSSProperties} from "preact/compat";

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export function App() {
    const [komaSet, setKomaSet] = useState(komaSetArray[0])

    let graphics_array = imageArray(komaSet);
    shuffleArray(graphics_array)
    const [src_graphics_array, setSrc_graphics_array] = useState(graphics_array);

    const [trgt_graphics_array, set_trgt_graphics_array] = useState([] as { data: string, alt: string }[])

    const [touchEnd, setTouchEnd] = useState(<></>)
    const dragstart_handler = (e: DragEvent) => {
        const target = e.target as HTMLImageElement
        target.style.visibility="hidden"
        //    console.log("drag start handler fired", target)
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move"
            e.dataTransfer.setData('text/plain', target.attributes[0].value)  //stuff src file name
            e.dataTransfer.setData('text/alt', target.alt) // stuff alt text 'fu','to' etc.,
        }
    }
    const onSelect_handler = (e: Event) => {
        // e.preventDefault();
        const newSet = komaSetArray[Number((e.target as HTMLOptionElement).value)] //array index is returned
        //   console.log('komaset', newSet)
        setKomaSet(newSet);
        const graphics_array = imageArray(newSet);
        shuffleArray(graphics_array)
        setSrc_graphics_array(graphics_array)
        set_trgt_graphics_array([])
    }
    const update_arrays = (data: string, alt: string) => {
        set_trgt_graphics_array([...trgt_graphics_array, {data: data, alt: alt}])
        setSrc_graphics_array(src_graphics_array.filter(e => e.pieceName !== alt))
    }
    const drop_handler = (e: DragEvent) => {
        e.preventDefault()
        const target = e.target as HTMLDivElement
        target.style.visibility="visible"
        const data = !!e.dataTransfer ? e.dataTransfer.getData("text/plain") : "";
        const dataText = !!e.dataTransfer ? e.dataTransfer.getData("text/alt") : ""
        if (target.id === dataText) update_arrays(data, dataText)


    }

    const touch_end_handler = (e: TouchEvent) => {

        e.preventDefault();

        (e.target as HTMLElement).style.visibility="visible"
        setTouchEnd(<></>)
   //     console.log('elements', document.elementsFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY))
        const target = document.elementsFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)[1].id
   //     console.log('target id', target)
        const alt = (e.target as HTMLImageElement).alt
    //    console.log('alt', alt)
        if (alt === target) {
            //     console.log('match', target)
            if (e.target) {
                const data: string = (e.target as HTMLImageElement).attributes[0].value
                update_arrays(data, target)
            }

        }
    }
    const drag_over_handler = (e: DragEvent) => {
        e.preventDefault();
        /* console.log('hover event fired');*/
    }
    const drag_enter_handler = (e: DragEvent) => {
        e.preventDefault();
    //    console.log('Drag Enter event fired');
    }
  /*  const drag_leave_handler = (e: DragEvent) => {
        e.preventDefault();
    //    console.log('Leave Event fired.')
    }*/
    const draggable_img = (data: string, alt: string) => <img
        src={data}
        class="koma"
        alt={alt}
        onDragStart={dragstart_handler}
        onDragEnd ={(e)=> {(e.target as HTMLImageElement).style.visibility="visible"}
    }
        onTouchStart={(e: TouchEvent) => {
            (e.target as HTMLElement).style.visibility="hidden";
         //   console.log('touch event started:', e.touches)
        }}
        onTouchMove={(e) => {

            let elem = e.target as HTMLImageElement

            const left = e.touches[0].clientX - ((e.touches[0].target as HTMLImageElement).clientWidth) / 2
            const top = e.touches[0].clientY - ((e.touches[0].target as HTMLImageElement).clientHeight) / 2
            const alt = elem.alt
            const src = elem.src
            const style = {left: left + 'px', top: top + 'px'} as CSSProperties

            /* console.log(`src:${src}, alt ${alt}, x ${clientX}, y ${clientY}` )
             console.log(<div className="move-target" style={style}><img src={src} className="koma"></img></div>)*/
            setTouchEnd(<img src={src} class="koma move-target" style={style} alt={alt}></img>)


        }}

        onTouchEnd={touch_end_handler}
    />
    return (
        <>
            <div class="row">
                <div class="col-4">
                    <div>
                        <label for="styleSelector" class="form-label">Select Koma Style </label>
                        <select id="styleSelector" class="form-select mb-3" onChange={onSelect_handler}>
                            {komaSetArray.map((e, index) => <option value={index}>{e.name}</option>)}
                        </select>
                    </div>
                    <div>
                        {(src_graphics_array.length === 0 || (src_graphics_array.length === 1 && !src_graphics_array[0].challenger)) &&
                            <div>Nice, now select different Koma Style</div>}
                        {src_graphics_array.map((e) => {
                                if (!(e.pieceName === "gyoku" && !e.challenger)) return draggable_img(e.piece('S'), e.pieceName)
                            }
                        )
                        }


                    </div>
                </div>
                <div className="col-8" id="drop-zone">
                    {Shogi_piece_arr.map(p => {
                            if (!(p.name === "Gyoku" && !komaSet.challenger)) return <div
                                class="d-inline-block  border border-primary align-top m-1 rounded">
                                <div class="piece-box"
                                     draggable={true}
                                     onDrop={drop_handler}
                                     onDragEnter={drag_enter_handler}
                                     style={"background-image:url('assets/img/moves/" + p.graphics + ".png');"}
                                     onDragOver={drag_over_handler}
                                     id={p.graphics}>

                                    {trgt_graphics_array.map((e) => {
                                        if (e.alt === p.graphics) return draggable_img(e.data, e.alt)
                                    })}
                                </div>
                                <div className=" align-self-end bg-dark text-white">{p.name}</div>
                            </div>
                        }
                    )
                    }
                </div>
            </div>

            {touchEnd}

        </>
    )
}
