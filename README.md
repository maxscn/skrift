# Skrift
A modern way to build PDF documents.

## Introduction

Skrift is for PDFs what skrift is for creating emails. It provides a set of components, a preview server, a self-hostable service for generating PDFs.

## Why

There is a lack of libraries for iteratively building PDF documents, without the generation step. The generation step is either done using a library where you directly interact with the PDF standard, which is cumbersome and makes designing beautiful PDFs a pain. The other alternative is to use a headless browser like puppeteer or playwright to make the PDF - Skrift does this too, but provides a preview UI for you to iterate on your PDFs in real-time.
