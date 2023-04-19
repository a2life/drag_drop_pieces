import {Shogi_piece_arr, shogiPiece} from "./koma_list";
/*
export const Shogi_piece_arr:shogiPiece[] = [
    {name: 'Pawn', jName: '歩兵', graphics: 'fu'},
    {name: 'Promoted Pawn', jName: 'と金', graphics: 'to'},
    {name: 'Lance', jName: '香車', graphics: 'kyo'},
    {name: 'Promoted Lance', jName: '成香', graphics: 'nkyo'},
    {name: 'Knight', jName: '桂馬', graphics: 'kei'},
    {name: 'Promoted Knight', jName: '成桂', graphics: 'nkei'},
    {name: 'Silver', jName: '銀将', graphics: 'gin'},
    {name: 'Promoted Silver', jName: '成銀', graphics: 'ngin'},
    {name: 'Gold', jName: '金将', graphics: 'kin'},
    {name: 'Bishop', jName: '角行', graphics: 'kaku'},
    {name: 'Dragon horse', jName: '竜馬', graphics: 'uma'},
    {name: 'Rook', jName: '飛車', graphics: 'hi'},
    {name: 'Dragon King', jName: '竜王', graphics: 'ryu'},
    {name: 'King', jName: '王将', graphics: 'ou'},
    {name: 'Gyoku', jName: '王将', graphics: 'gyoku'},
]
 const graphics_arr = Shogi_piece_arr.map(e => '/assets/img/koma/' + komaSet.dir + '/S' + e.graphics + '.png');
 export const komaSetArray =[
    { name:"street", dir:'koma_dirty', challenger:false},  //option 0
    { name:"Kinki(錦旗)", dir:'koma_kinki', challenger:false},  //option1
    { name: "Kinki Red(錦旗　裏朱)", dir:'koma_kinki_r', challenger: true},  //option2
    { name: "Kinki Tiger(錦旗　虎斑)", dir: 'koma_kinki_torafu',challenger:false},  //option 3
    { name: "Ryoko(菱湖)", dir:'koma_ryoko',challenger:false},  //option 4
    { name :"Ryoko Single(菱湖　一字)", dir: 'koma_ryoko_1',challenger: true},  // option 5
    { name: "Ryoko Tiger(菱湖　虎斑)", dir: 'koma_ryoko_torafu',challenger: false},  //option 6
    { name: "Hidetch", dir: 'koma_hidetchi',challenger: true} //option 7
]
 */
export type KomaSet={name:string,dir:string,challenger:boolean}
export const imageArray=(komaSet:KomaSet)=> {
    const imagePath=`/assets/img/koma/`
    return  Shogi_piece_arr.map(e=>{
        return {
            piece:(side:string)=>imagePath+komaSet.dir+'/'+side+e.graphics+'.png',
            challenger:komaSet.challenger,
            name:komaSet.name,
            pieceName:e.graphics
        }   //return object

        }
    )


}