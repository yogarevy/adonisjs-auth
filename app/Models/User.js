"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// @ts-ignore
const Model = use("Model");

/** @type {import('@adonisjs/framework/src/Hash')} */
// @ts-ignore
const Hash = use("Hash");

class User extends Model {
  static get primaryKey() {
    return "id";
  }

  static get incrementing() {
    return false;
  }

  static get hidden() {
    return ["password", "deleted_at", "created_at", "updated_at", "avatar_id"];
  }

  static get visible() {
    return [
      "id",
      "name",
      "email",
      "phone",
      "status",
      "is_main",
      "last_modified_by",
      "deleted_by",
    ];
  }

  static boot() {
    super.boot();

    // Add the trait and casts to a model
    this.addTrait("@provider:CastAttributes");

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        // @ts-ignore
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  // add values to cast to upon set
  static get casts() {
    return {
      status: "boolean",
      is_main: "boolean",
    };
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    // @ts-ignore
    return this.hasMany("App/Models/Token");
  }
}

module.exports = User;
