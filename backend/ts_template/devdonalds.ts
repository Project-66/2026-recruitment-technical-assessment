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

interface summary {
  name: string;
  cookTime: number;
  ingredients: requiredItem[];
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: Map<string, ingredient | recipe> = new Map();

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
  if (cookbook.has(input.name)) {
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
    cookbook.set(recipe.name, recipe);
    res.status(200).send();
  } else if (input.type === "ingredient") {
    const ingredient = input as ingredient;

    // check if the cooktime is correct
    if (ingredient.cookTime as number < 0) {
      res.status(400).send(`cookTime for the ingredient ${ingredient.name} must be greater than or equal to 0`);
      return;
    }

    // great success!
    cookbook.set(ingredient.name, ingredient);
    res.status(200).send();
    return;
  } else {
    res.status(400).send("incorrect type (not recipe or ingredient)!");
  }
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req: Request, res: Response) => {
  const name: string = req.query.name;

  // check if we have this in the cookbook
  if (!cookbook.has(name)) {
    res.status(400).send(`i fear this cookbook does NOT have any recipe called "${name}"`);
    return;
  }

  let currRecipe = cookbook.get(name);

  if (currRecipe.type === "ingredient") {
    res.status(400).send(`${name} is listed as an INGREDIENT in the cookbook, NOT a recipe`);
    return;
  }

  // now that we know its a recipe, we can parse it as one.
  currRecipe = currRecipe as recipe;

  let cookTime: number = 0;
  let ingredientsMap: Map<string, requiredItem> = new Map();

  /**
   * this function adds ingredients, and recursively adds ingredients from other recipes
   * \that may be included in reqItems
   * @param reqItems list of requiredItems
   */
  const addItems = (reqItems: requiredItem[]) => {
    for (const item of reqItems) {
      const cookbookItem: recipe | ingredient = cookbook.get(item.name);

      if (cookbookItem === undefined) {
        res.status(400).send(`${item.name} is NOT in the cookbook`);
        return;
      }

      if (cookbookItem.type === "ingredient") {
        const ingredient = cookbookItem as ingredient;
        // if another recipe already included this ingredient, just top up that specific count instead of having two entries
        if (ingredientsMap.has(item.name)) {
          let currIngredient = ingredientsMap.get(item.name);
          currIngredient.quantity += item.quantity;
          ingredientsMap.set(item.name, currIngredient);
        } else {
          ingredientsMap.set(item.name, item);
        }
        cookTime += item.quantity * ingredient.cookTime;
      } else {
        const recipe = cookbookItem as recipe;
        addItems(recipe.requiredItems);
      }
    }
  }

  addItems(currRecipe.requiredItems);

  const ingredients = [];

  ingredientsMap.forEach((value) => ingredients.push(value));

  res.status(200).send({
    name: name,
    cookTime: cookTime,
    ingredients: ingredients,
  });
  return;

});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
