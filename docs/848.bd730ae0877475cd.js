"use strict";(self.webpackChunkEcommerce=self.webpackChunkEcommerce||[]).push([[848],{848:(h,c,i)=>{i.r(c),i.d(c,{AllordersComponent:()=>g});var a=i(6814),d=i(6472),t=i(4769),_=i(6286);function n(r,p){1&r&&(t.TgZ(0,"div",3)(1,"h3"),t._uU(2,"You haven't "),t.TgZ(3,"span",4),t._uU(4,"ordered"),t.qZA(),t._uU(5," yet!"),t.qZA()())}function m(r,p){if(1&r&&(t.TgZ(0,"div",20),t._UZ(1,"img",21),t.qZA()),2&r){const e=p.$implicit;t.xp6(1),t.Q6J("src",e.product.imageCover,t.LSH)("alt",e.product.title)}}function s(r,p){if(1&r&&(t.TgZ(0,"div",9)(1,"h2",10),t._uU(2," Order "),t.TgZ(3,"span",4),t._uU(4),t.qZA()(),t.TgZ(5,"div",11),t.YNc(6,m,2,2,"div",12),t.qZA(),t.TgZ(7,"div",13)(8,"h3",14)(9,"span",15),t._uU(10,"Total price: "),t.qZA(),t._uU(11),t.ALo(12,"currency"),t.qZA(),t.TgZ(13,"h3",14)(14,"span",15),t._uU(15,"Payment method: "),t.qZA(),t._uU(16),t.qZA(),t.TgZ(17,"h3",14)(18,"span",15),t._uU(19,"Shipping price: "),t.qZA(),t._uU(20),t.qZA(),t.TgZ(21,"h3",16)(22,"span",15),t._uU(23,"Shipping info: "),t.qZA(),t.TgZ(24,"ul",17)(25,"li",18)(26,"span",15),t._uU(27,"City: "),t.qZA(),t._uU(28),t.qZA(),t.TgZ(29,"li",19)(30,"span",15),t._uU(31,"Details: "),t.qZA(),t._uU(32),t.qZA(),t.TgZ(33,"li",18)(34,"span",15),t._uU(35,"phone: "),t.qZA(),t._uU(36),t.qZA()()()()()),2&r){const e=p.$implicit,l=p.index;t.xp6(4),t.Oqu(l+1),t.xp6(2),t.Q6J("ngForOf",e.cartItems),t.xp6(5),t.hij("",t.xi3(12,8,e.totalOrderPrice,"EGP ")," "),t.xp6(5),t.hij("",e.paymentMethodType," "),t.xp6(4),t.hij("",e.shippingPrice," "),t.xp6(8),t.hij("",e.shippingAddress.city," "),t.xp6(4),t.hij("",e.shippingAddress.details," "),t.xp6(4),t.hij("",e.shippingAddress.phone," ")}}function o(r,p){if(1&r&&(t.TgZ(0,"div",5)(1,"h2",6),t._uU(2," Your "),t.TgZ(3,"span",4),t._uU(4,"Orders"),t.qZA()(),t.TgZ(5,"div",7),t.YNc(6,s,37,11,"div",8),t.qZA()()),2&r){const e=t.oxw();t.xp6(6),t.Q6J("ngForOf",e.ordersData)}}let g=(()=>{class r{constructor(e){this._CartService=e,this.cartOwner="",this.ordersData=[],this.isEmpty=!0}ngOnInit(){this.cartOwner=localStorage.getItem("cartOwner"),this._CartService.getOrders(this.cartOwner).subscribe({next:e=>{this.isEmpty=!1,this.ordersData=e}})}static#t=this.\u0275fac=function(l){return new(l||r)(t.Y36(_.N))};static#e=this.\u0275cmp=t.Xpm({type:r,selectors:[["app-allorders"]],standalone:!0,features:[t.jDz],decls:3,vars:2,consts:[[1,"pt-5"],["class","caption bg-main-light p-5 rounded-2 shadow-sm text-center",4,"ngIf"],["class","bg-main-light p-4 rounded-2 shadow-sm",4,"ngIf"],[1,"caption","bg-main-light","p-5","rounded-2","shadow-sm","text-center"],[1,"main-color"],[1,"bg-main-light","p-4","rounded-2","shadow-sm"],[1,"text-center","pb-3"],[1,"row","p-4"],["class","col-md-6 border-top py-4",4,"ngFor","ngForOf"],[1,"col-md-6","border-top","py-4"],[1,"h4","pb-3"],[1,"row"],["class","col-md-2",4,"ngFor","ngForOf"],[1,"order-info","d-flex","flex-column","px-3"],[1,"small","h6"],[1,"main-color","fw-bold"],[1,"small","h6","d-flex","flex-column","flex-wrap"],[1,"list-unstyled"],[1,"pt-2","ps-2"],[1,"pt-2","ps-2","d-flex","flex-wrap"],[1,"col-md-2"],["alt","",1,"w-100","img-thumbnail","mb-3",3,"src","alt"]],template:function(l,u){1&l&&(t.TgZ(0,"section",0),t.YNc(1,n,6,0,"div",1),t.YNc(2,o,7,1,"div",2),t.qZA()),2&l&&(t.xp6(1),t.Q6J("ngIf",u.isEmpty),t.xp6(1),t.Q6J("ngIf",!u.isEmpty))},dependencies:[a.ez,a.sg,a.O5,a.H9,d.JX]})}return r})()},6286:(h,c,i)=>{i.d(c,{N:()=>_});var a=i(5619),d=i(4769),t=i(9862);let _=(()=>{class n{constructor(s){this._HttpClient=s,this.baseUrl="https://ecommerce.routemisr.com/api/v1/",this.cartNumber=new a.X(0)}addToCart(s){return this._HttpClient.post(this.baseUrl+"cart",{productId:s})}getCartUser(){return this._HttpClient.get(this.baseUrl+"cart")}updateCartCount(s,o){return this._HttpClient.put(this.baseUrl+`cart/${s}`,{count:o})}removeCartItem(s){return this._HttpClient.delete(this.baseUrl+`cart/${s}`)}clearCart(){return this._HttpClient.delete(this.baseUrl+"cart")}checkOut(s,o){return this._HttpClient.post(this.baseUrl+`orders/checkout-session/${s}?url=http://localhost:4200`,{shippingAddrees:o})}getOrders(s){return this._HttpClient.get(this.baseUrl+`orders/user/${s}`)}static#t=this.\u0275fac=function(o){return new(o||n)(d.LFG(t.eN))};static#e=this.\u0275prov=d.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})()}}]);