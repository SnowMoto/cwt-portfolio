def decode(message_file):
    # Read the contents of the file
    with open(message_file, 'r') as file:
        lines = file.readlines()

    # Initialize an empty list to store the message words
    message_words = []

    # Loop through the lines to extract the message words
    for i, line in enumerate(lines):
        # Split the line into number and word
        num, word = line.split()
        # Convert the number to an integer
        num = int(num)
        # If the number is the same as the line number, it's part of the message
        if num == i + 1:
            message_words.append(word)

    # Join the message words into a single string and return
    return ' '.join(message_words)

# Example usage:
decoded_message = decode("encoded_message.txt")
print(decoded_message)


