import time
from googletrans import Translator

def live_translator():
    translator = Translator()

    print("Welcome to the Live Translator!")
    print("Enter text to translate, or type 'quit' to exit.")
    print("Format: <source_language> <target_language> <text>")
    print("Example: en es Hello, how are you?")

    while True:
        user_input = input("\nEnter text to translate: ")
        
        if user_input.lower() == 'quit':
            print("Thank you for using the Live Translator. Goodbye!")
            break
        
        try:
            source_lang, target_lang, *text = user_input.split()
            text = ' '.join(text)
            
            start_time = time.time()
            result = translator.translate(text, src=source_lang, dest=target_lang)
            end_time = time.time()
            
            print(f"\nTranslated text: {result.text}")
            print(f"Translation time: {end_time - start_time:.2f} seconds")
            
        except ValueError:
            print("Invalid input format. Please use: <source_language> <target_language> <text>")
        except Exception as e:
            print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    live_translator()