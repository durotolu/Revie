
exports.up = function (knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('username', 255)
        .notNullable()
        .unique();
      tbl.string('password')
        .notNullable();
      tbl.string('email')
        .unique()
        .comment('This is the email field')
    })
    .createTable('apartments', tbl => {
      tbl.increments();
      tbl.text('address', 255)
        .notNullable()
        .unique();
      tbl.string('city', 255)
        .notNullable();
      tbl.integer('toilets')
        .notNullable();
      tbl.integer('bathrooms')
        .notNullable();
      tbl.integer('bedrooms')
        .notNullable();
      tbl.boolean('sittingroom')
        .defaultTo(false);
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('reviews', tbl => {
      tbl.increments();
      tbl.string('media');
      tbl.text('environment')
      tbl.text('landlord')
      tbl.text('amenities')
      tbl.timestamp('created_at')
        .notNullable()
        .defaultTo(knex.fn.now())
      tbl.integer('helpful_count')
        .defaultTo(0)
      tbl.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('park_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('parks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('reviews')
    .dropTableIfExists('apartments')
    .dropTableIfExists('users')
};
