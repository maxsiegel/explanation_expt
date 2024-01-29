library(tidyverse)

setwd("/Users/maxs/explanation_experiment/analysis")
ddir <- normalizePath("../data")
sub_files <- dir(ddir, full.names = TRUE)

keep_cols <- c("response", "id", "rt")

all_data <- sub_files %>%
  map(read_csv) %>%
  reduce(rbind)
## select(any_of(keep_cols))

data <- all_data %>%
  filter(trial_type == "html-slider-response")

trials <- data %>%
  group_by(trial_index) %>%
  filter(condition == 1) %>%
  mutate(response = as.numeric(response)) %>%
  summarize(average = mean(response))

ggplot(trials, aes(x = factor(trial_index), y = average)) +
  geom_col() +
  scale_x_discrete(breaks = trials$trial_index, labels = trials$trial_index) +
  xlab("trial number")

  ## scale_x_discrete(breaks = trials$trial_index, labels = trials$trial_index)
