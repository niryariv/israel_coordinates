israel_coordinates
==================

List long/lat of places in Israel.

Input: CSV of place names (locations.csv)
Output: CSV of place names + coordinates (locations_with_coords.csv)

Usage:

1. Create locations.csv

2. Remove all '"' characters (Node CSV seems to have an issue with handling RTL \")

3. run "node parse.js"