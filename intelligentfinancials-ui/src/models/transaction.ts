/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or a "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
export class Transaction {
constructor(res:any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in res) {
          //Repalce account objects with their identifiers
if((f === 'accountTo' || f === 'accountFrom') && (res[f] instanceof Object)) {
              //console.log("Found : " +f);
              this[f] = ""+(res[f].identifier);
            }
        else
          this[f] = res[f];
        }
    //console.log("Transaction:"+JSON.stringify(this));
  }

}
