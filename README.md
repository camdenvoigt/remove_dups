remove_dups reads a json file and can remove entries with duplicate keys keeping the newest. These entries must all have the key(s) that are to be unique and have some sort of date field to compare with. Keys can either be provided via command line arguments or a config file. If none are provided defaults will be used.

### Usage:
        remove_dups <input_file> [(<date_key> <unique_keys> <json_path>)] [options]
        remove_dups -h

### Arguments:
    If an optional argument is not included a default will be used. Defaults will match the example config below.
    
    input_file      JSON file that has a list of entries to remove duplicates from
    date_key        Key for the date field in the entries to compare
    unique_keys     An array of keys included in the entries that should be unique in the output e.g. "['_id', 'email']"
    json_path       An array of keys/indicies to get to the list of entries in the given JSON e.g. "['leads']"

### Options:
    -h  Show this information
    -v  Show all logs in console, does not work when log file is specified
    -l  Realitive path to log file. Will log verbosly to file
    -o  Realative path to output file.
    -c  Relative path to config file that can specify all options and keys

### Config File:
    All arguments and keys except input_file can be give via a JSON config file. Keys should be camel case. Explictly set options will override what is set by the config file. 
    
     Example

    {
        "logFilePath": "../log.txt",
        "outputFilePath": "../output.txt",
        "isVerbose": false,
        "keys": {
            "dateKey": "entryDate",
            "uniqueKeys": [
                "_id",
                "email"
            ],
            "jsonPath": [
                "test",
                "leads"
            ]
        }
    }

### Example Usage

    Get output in stdout
    remove_dups example/leads.json

    Get output with full logging
    remove_dups example/leads.json -v


