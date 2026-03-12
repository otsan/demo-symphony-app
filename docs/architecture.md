# Architecture Guide

## Purpose

Describe the system so agents and engineers can make safe changes without guessing.

## Required Sections

## 1. System Boundary

- What this system owns
- What this system does not own
- External dependencies and contracts

## 2. Module Map

For each module:
- Responsibility (one sentence)
- Public interfaces
- Allowed dependencies
- Forbidden dependencies

## 3. Data and State Flow

- Request/event entry points
- State transitions
- Persistence boundaries

## 4. Failure Model

- Expected failures
- Retry policy
- Timeout policy
- Escalation policy

## 5. Change Safety Rules

- Invariants that must never break
- Backward-compatibility requirements
- Rollback strategy
