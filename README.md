remove_dups reads a json file and can remove entries with duplicate keys keeping the newest. These entries must all have the key(s) that are to be unique and have some sort of date field to compare with.

Usage:
    ```
        remove_dups <input_file>
        remove_dups -h | --help
    ```

Options:
```
    -h, --help              Show this information
    -v, --verbose           Show all logs in console, does not work when log file is specified
    -l, --logFilePath       Realitive path to log file. Will log verbosly to file
    -o, --outputFilePath    Realative path to output file.
```