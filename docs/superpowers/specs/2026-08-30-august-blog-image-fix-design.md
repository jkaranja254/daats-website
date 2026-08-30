# August Blog Image Fix Design

## Goal

Replace the August blog hero image with a corrected trucking-yard composition that fixes two realism errors in the current asset:
- the trailer must be fully visible, including the rear axle area
- the tractor-trailer must be docked square to the bay at 90 degrees, not sideways

## Visual Direction

Keep the same overall purpose and feel as the current blog hero:
- realistic freight-yard marketing image
- late-afternoon / end-of-summer lighting
- clean warehouse and dock environment
- professional trucking-industry look

## Required Corrections

- lead truck should use a modern 2025 Peterbilt-style front design without logos
- at least one full trailer should be visible from tractor to rear axle
- trailer should be backed straight into the dock
- dock geometry should look operationally correct for a real loading bay

## File Impact

Replace the existing asset in place:
- `assets/images/blog-fall-freight-prep.png`

No content, layout, metadata, or routing changes are required.

## Verification

- inspect the generated replacement image visually
- confirm the replacement file exists in the workspace
- run `npm test` to confirm the unchanged site contract still passes
- push the updated asset to `preview` and verify the public preview link still resolves
