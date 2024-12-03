import openai

openai.api_key = ""

def query_openai(prompt, model="gpt-4"):
    try:
        response = openai.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"An error occurred: {e}"

if __name__ == "__main__":
    prompt = "What are the possible diseases if the symptom is yellow eyes? List 5 possible diseases."
    response = query_openai(prompt)
    print("Response from OpenAI:", response)
