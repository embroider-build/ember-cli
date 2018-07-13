/* global require, module, escape */
'use strict';

const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const UnwatchedDir = require('broccoli-source').UnwatchedDir;

exports.prebuildV1Package = function prebuildV1Package(addonInstance) {
  let trees = [];
  let rootTree = new UnwatchedDir(addonInstance.root);
  trees.push(new Funnel(rootTree, {
    include: ['package.json'],
    destDir: addonInstance.pkg.name,
  }));

  if (typeof addonInstance._treeFor === 'function') {
    let tree = addonInstance._treeFor('addon');
    if (tree) {
      trees.push(tree);
    }
  }
  return mergeTrees(trees);
};
