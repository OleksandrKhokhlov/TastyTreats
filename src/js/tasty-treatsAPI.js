'use strict';

import axios from 'axios';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';
const ENDPOINTS_RECIPES = 'recipes/';
const ENDPOINTS_RECIPES_POPULAR = 'popular/';
const ENDPOINTS_AREAS = 'areas/';
const ENDPOINTS_CATEGORIES = 'categories/';
const ENDPOINTS_EVENTS = 'events/';
const ENDPOINTS_INGREDIENTS = 'ingredients/';

export class testyTreatsAPI {
  page = 1;
  limit = 6;
  id = null;

  async loadRecipes() {
    return await axios.get(`${BASE_URL}` + `${ENDPOINTS_RECIPES}`, {
      params: {
        page: this.page,
        limit: this.limit,
      },
    });
  }

  async loadRecipesPopular() {
    return await axios.get(
      `${BASE_URL}` + `${ENDPOINTS_RECIPES}` + `${ENDPOINTS_RECIPES_POPULAR}`,
      {
        params: {
          page: this.page,
          limit: this.limit,
        },
      }
    );
  }

  async loadRecipesById() {
    return await axios.get(
      `${BASE_URL}` + `${ENDPOINTS_RECIPES}` + `${this.id}`,
      {
        params: {
          page: this.page,
          limit: this.limit,
        },
      }
    );
  }

  async loadAreas() {
    return await axios.get(`${BASE_URL}` + `${ENDPOINTS_AREAS}`, {
      params: {
        page: this.page,
        limit: this.limit,
      },
    });
  }

  async loadCategories() {
    return await axios.get(`${BASE_URL}` + `${ENDPOINTS_CATEGORIES}`, {
      params: {
        page: this.page,
        limit: this.limit,
      },
    });
  }

  async loadEvents() {
    return await axios.get(`${BASE_URL}` + `${ENDPOINTS_EVENTS}`, {
      params: {
        page: this.page,
        limit: this.limit,
      },
    });
  }

  async loadIngredients() {
    return await axios.get(`${BASE_URL}` + `${ENDPOINTS_INGREDIENTS}`, {
      params: {
        page: this.page,
        limit: this.limit,
      },
    });
  }
}
