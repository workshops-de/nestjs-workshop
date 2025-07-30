#!/bin/bash
# Declare commit Message prefix
commitMessagePrefix="solution--"

# Delete old tags
deletedTags=$(git tag | grep $commitMessagePrefix | xargs git tag -d)

# Filter relevant commits
logs=$(git log --oneline | grep $commitMessagePrefix)

# Process commit messages
# - create tag for relevant commit message
# - push tag
IFS=$'\n'
for line in $logs; do
  # Split to $sha and rest(commit $message) by first space
  IFS=' '
  read -r sha message <<< $line

  # Replace some special chars
  message=${message// /-}
  message=${message//'*'/}
  message=${message//'('/}
  message=${message//')'/}

  echo $message
  git tag $message $sha
  git push origin :$message
  git push origin $message
done

