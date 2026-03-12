SHELL := /bin/bash

.PHONY: lint test typecheck validate

JS_FILES := server.js test/health.test.js

lint:
	node --check $(JS_FILES)

test:
	node --test

typecheck:
	node --check $(JS_FILES)

validate: lint test typecheck
