'use strict'

// @ts-ignore
const BaseMapper = use('App/Services/Mapper/BaseMapper')

class UserMapper extends BaseMapper {
    /**
    * Map single object to desired result.
    *
    * @param item
    * @return array|mixed
    */
    single(item) {
        return {
            'id': item.id,
            'name': item.name,
            'email': item.email,
            'phone': item.phone,
            'status': Boolean(Number(item.status)),
            'is_main': Boolean(Number(item.is_main)),
            'created_at': item.created_at,
            'last_modified_by': item.last_modified_by,
            'deleted_by': item.deleted_by
        }
    }
}

module.exports = UserMapper
