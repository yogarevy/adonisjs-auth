'use strict'

class BaseMapper {
  /**
  * Loop through single() function to generate multiple mapped data.
  *
  * @param items
  * @return array
  */
  list(items)
  {
    let result = [];
    for(let i in items){
      result.push(this.single(items[i]))
    }

    return result;
  }

  /**
  * Mapper class must implement this function in order to make list() function work.
  *
  * @param item
  * @return mixed
  */
  single(item){}

  /**
   * Mapper for data create response.
   *
   * @param item
   * @return mixed
   */
   create(item){}

   /**
   * Mapper for data edit response.
   *
   * @param item
   * @return mixed
   */
  edit(item){}
}

module.exports = BaseMapper