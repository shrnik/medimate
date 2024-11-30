import openai

# Replace with your OpenAI API key
openai.api_key = "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"

def query_openai(prompt, model="gpt-4"):
    try:
        # Send a chat completion request to the API
        response = openai.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}]
        )
        # Extract and return the response content
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"An error occurred: {e}"

if __name__ == "__main__":
    # Example prompt
    prompt = "What are the possible diseases if the symptom is yellow eyes? List 5 possible diseases."
    response = query_openai(prompt)
    print("Response from OpenAI:", response)