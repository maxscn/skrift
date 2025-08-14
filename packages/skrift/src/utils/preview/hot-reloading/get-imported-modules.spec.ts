import { promises as fs } from 'node:fs';
import { getImportedModules } from './get-imported-modules.js';

vi.mock('@babel/traverse', async () => {
  const traverse = await vi.importActual('@babel/traverse');
  return { default: traverse };
});

describe('getImportedModules()', () => {
  it('should work with this test file', async () => {
    const contents = await fs.readFile(import.meta.filename, 'utf8');

    expect(getImportedModules(contents)).toEqual([
      'node:fs',
      './get-imported-modules.js',
    ]);
  });

  it('should work with direct exports', () => {
    const contents = `export * from './component-a';
    export { ComponentB } from './component-b'; 

    import { ComponentC } from './component-c';
    export { ComponentC }`;
    expect(getImportedModules(contents)).toEqual([
      './component-a',
      './component-b',
      './component-c',
    ]);
  });

  it('should work with regular imports and double quotes', () => {
    const contents = `import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@skrift/components";
import { Tailwind } from "@skrift/tailwind";
import { Component } from '../../my-component';

import * as React from "react";
    `;
    expect(getImportedModules(contents)).toEqual([
      '@skrift/components',
      '@skrift/tailwind',
      '../../my-component',
      'react',
    ]);
  });

  it('should work with regular imports and single quotes', () => {
    const contents = `import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@skrift/components';
import { Tailwind } from '@skrift/tailwind';
import { Component } from '../../my-component';

import * as React from 'react';
    `;
    expect(getImportedModules(contents)).toEqual([
      '@skrift/components',
      '@skrift/tailwind',
      '../../my-component',
      'react',
    ]);
  });

  it('should work with commonjs require with double quotes', () => {
    const contents = `const {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} = require("@skrift/components");
const { Tailwind } = require("@skrift/tailwind");
const { Component } = require("../../my-component");

const React = require("react");
    `;
    expect(getImportedModules(contents)).toEqual([
      '@skrift/components',
      '@skrift/tailwind',
      '../../my-component',
      'react',
    ]);
  });

  it('should work with commonjs require with single quotes', () => {
    const contents = `const {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} = require('@skrift/components');
const { Tailwind } = require('@skrift/tailwind');
const { Component } = require('../../my-component');

const React = require('react');
    `;
    expect(getImportedModules(contents)).toEqual([
      '@skrift/components',
      '@skrift/tailwind',
      '../../my-component',
      'react',
    ]);
  });
});
