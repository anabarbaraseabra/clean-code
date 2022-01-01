export default class ItemDimensions {
    constructor(readonly height:number, readonly width: number, readonly depth: number, readonly weight: number){
    }
    
    getVolume() {
        return (this.height * this.width * this.depth)/1000000;
    }

    getDensity(){
        return this.weight / this.getVolume();
    }
}