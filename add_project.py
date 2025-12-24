import argparse
import json

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--id", required=True, type=str)
    parser.add_argument("--name", required=True, type=str)
    parser.add_argument("--brief", required=True, type=str)
    parser.add_argument("--date", required=True, type=str)
    parser.add_argument("--link", required=True, type=str)
    parser.add_argument("--hidden", default=False, type=bool)
    
    args = vars(parser.parse_args())

    with open("projects.json", "r") as json_file:
        json_obj = json.loads(json_file.read())

    json_obj.append(args)

    with open("projects.json", "w") as json_file:
        json.dump(json_obj, json_file, indent=4)
        json_file.write("\n")



if __name__ == "__main__":
    main()