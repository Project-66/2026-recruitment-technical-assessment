import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook = [];
const cookbookNames = new Map();

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  // removes all non-letter
  recipeName = recipeName.replace(/[^a-zA-Z\-_ ]/g, '');

  // replaces "-" sequences with a single space
  recipeName = recipeName.split("-").join(" ");

  // replaces "_" sequences with a single space
  recipeName = recipeName.split("_").join(" ");

  // capitalise all the words now, yippee!
  let words = recipeName.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }

  recipeName = words.join(" ");
  return recipeName.length === 0 ? null : recipeName;
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req: Request, res: Response) => {
  const input = req.body;
  // check if the name of the new item is unique
  if (cookbookNames.has(input.name)) {
    res.status(400).send(`you cannot have two entries with the name ${input.name} in the cookbook`);
    return;
  }

  // check if the type is correct
  if (input.type === "recipe") {
    const recipe = input as recipe;
    
    // check if all the items in requiredItems have a unique name using a Map
    const namesMap = new Map();

    for (let i = 0; i < recipe.requiredItems.length; i++) {
      const currItem = recipe.requiredItems[i] as requiredItem;
      if (namesMap.has(currItem.name)) {
        res.status(400).send(`you cannot have multiple requiredItems with the same name in the recipe ${recipe.name}`);
        return;
      } else {
        namesMap.set(currItem.name, null);
      }
    }

    // great success!
    cookbook.push(recipe);
    cookbookNames.set(recipe.name, null);
    res.status(200).send();
  } else if (input.type === "ingredient") {
    const ingredient = input as ingredient;

    // check if the cooktime is correct
    if (ingredient.cookTime as number < 0) {
      res.status(400).send(`cookTime for the ingredient ${ingredient.name} must be greater than or equal to 0`);
      return;
    }

    // great success!
    cookbook.push(ingredient);
    cookbookNames.set(ingredient.name, null);
    res.status(200).send();
  } else {
    res.status(400).send("incorrect type (not recipe or ingredient)!");
  }
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  // TODO: implement me
  res.status(500).send("not yet implemented!")

});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
