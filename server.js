const path = require('path');
const fs = require('fs');
const express = require('express');
const database = require('./db/db.json')

const app = express();

const PORT = process.env.PORT || 3001;

