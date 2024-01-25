library(tidyverse)


ddir <- normalizePath("../data")
sub_files <- dir(ddir, full.names = TRUE)

keep_cols <- c("task", "correct", "id", "rt", "target_side")

data <- sub_files %>%
  map(read_csv) %>%
  reduce(rbind) %>%
  filter(task == "response")  %>%
  select(keep_cols)

data %>%
  group_by(id)
