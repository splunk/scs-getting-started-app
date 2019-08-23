events=read-splunk-firehose();
write-index(events, literal(""), literal("main"));