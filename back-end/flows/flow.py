from tasks.download_data import download_data
from tasks.unzip_data import unzip_data
from tasks.truncate_data import truncate_data
from tasks.load_data import load_data


def main():
    # download most recent crime data from APD website
    file_path = download_data()

    # unzip downloaded data
    unzip_data(file_path)

    # truncate data in a database
    truncate_data()

    # load data into a database
    load_data()


if __name__ == "__main__":
    main()
