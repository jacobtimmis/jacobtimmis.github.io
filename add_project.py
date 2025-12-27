import argparse
import json
from datetime import datetime

HIDDEN_ARG = "hidden"
COVER_ARG = "cover"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--id", required=True, type=str)
    parser.add_argument("--name", required=True, type=str)
    parser.add_argument("--brief", required=True, type=str)
    parser.add_argument("--date", required=True, type=str)
    parser.add_argument("--link", required=True, type=str)
    parser.add_argument(f"--{HIDDEN_ARG}", default="False")
    parser.add_argument(f"--{COVER_ARG}", default="False")

    args = vars(parser.parse_args())

    if args[HIDDEN_ARG].lower() == "false":
        args[HIDDEN_ARG] = False
    if args[COVER_ARG].lower() == "false":
        args[COVER_ARG] = False

    with open("projects.json", "r") as json_file:
        json_obj = json.loads(json_file.read())

    json_obj.append(args)

    with open("projects.json", "w") as json_file:
        json.dump(json_obj, json_file, indent=4)
        json_file.write("\n")

    with open("lastupdate.txt", "w") as last_update_file:
        last_update_file.write(datetime.today().strftime('%Y-%m-%d UTC'))

if __name__ == "__main__":
    main()
