'use strict';

import axios from 'axios';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/';

export class testyTreatsAPI {
  page = 1;
  limit = 6;
  id = '';
  title = '';
  category = '';
  area = '';
  ingredient = '';
  time = '';

  async loadRecipes() {
    const windowWidth = Math.round(window.visualViewport.width);
    if (windowWidth > 760 && windowWidth < 1280) {
      this.limit = 8;
    } else if (windowWidth > 1280) {
      this.limit = 9;
    }
    return await axios.get(`${BASE_URL}recipes/`, {
      params: {
        title: this.title,
        category: this.category,
        area: this.area,
        ingredient: this.ingredient,
        time: this.time,
        page: this.page,
        limit: this.limit,
      },
    });
  }

  async loadRecipesPopular() {
    return await axios.get(`${BASE_URL}recipes/popular/`);
  }

  async loadRecipesById() {
    return await axios.get(`${BASE_URL}recipes/${this.id}`);
  }

  async loadAreas() {
    return await axios.get(`${BASE_URL}areas/`);
  }

  async loadCategories() {
    return await axios.get(`${BASE_URL}categories/`);
  }

  async loadEvents() {
    return await axios.get(`${BASE_URL}events/`);
  }

  async loadIngredients() {
    return await axios.get(`${BASE_URL}ingredients/`);
  }
}
