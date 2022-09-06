import * as mongoDB from "mongodb";

import { createRouter } from "./context";
import { instantiateMongoClient } from "../../utils/mongo";
import { z } from "zod";

let collection: mongoDB.Collection;

(async () => {
  collection = await instantiateMongoClient();
})();

const getList = async () => await collection.find().toArray();

const parseDate = (str: string) => {
  var [month, day, year] = str.split("/").map((num) => parseInt(num));

  if (!month || !day || !year) {
    return new Date();
  } else {
    return new Date(year, month - 1, day);
  }
};

const dateDiff = (first: Date, second: Date) => {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round(
    (second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24)
  );
};

export const orderRouter = createRouter()
  .query("get_list", {
    async resolve() {
      return await getList();
    },
  })
  .query("get_next_two", {
    async resolve() {
      const list = await getList();

      const anchorDay = parseDate("9/3/2022");
      const today = new Date();

      const diff = dateDiff(anchorDay, today);

      const onDutyTodayIdx = diff % 4;
      const onDutyTomorrowIdx = (onDutyTodayIdx + 1) % 4;

      if (list.length < 4) {
        return [];
      }

      return [list[onDutyTodayIdx], list[onDutyTomorrowIdx]];
    },
  });
