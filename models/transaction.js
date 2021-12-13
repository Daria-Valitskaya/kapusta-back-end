const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
  {
    date: {
      type: String,
      required: [true, "Set date"],
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    category: {
      type: String,
      required: [true, "Set category"],
      enum: [
        "Транспорт",
        "Продукты",
        "Здоровье",
        "Алкоголь",
        "Развлечения",
        "Всё для дома",
        "Техника",
        "Коммуналка и связь",
        "Спорт и хобби",
        "Образование",
        "Прочее",
        "ЗП",
        "Дополнительные доходы",
      ],
    },
    sum: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
      enum: ['income', 'expense']
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  date: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  isIncome: Joi.boolean().required(),
});

const Transaction = model("transacton", transactionSchema);

module.exports = {
  Transaction,
  joiSchema,
};
