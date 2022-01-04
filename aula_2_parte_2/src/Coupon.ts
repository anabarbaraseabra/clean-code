export default class Coupon {
     constructor(readonly coupon: string, readonly discount: number, readonly expiration: Date ){
     }

     isValid(today: Date = new Date) { //depedency inversion
          return this.expiration.getTime() >= today.getTime()
     }

     isExpired(today: Date = new Date) {
          return !this.isValid(today);
     }
}