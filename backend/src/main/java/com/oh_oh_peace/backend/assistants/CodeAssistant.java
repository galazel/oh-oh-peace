package com.oh_oh_peace.backend.assistants;

import com.oh_oh_peace.backend.dtos.CodeReviewResponseDTO;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.spring.AiService;
import dev.langchain4j.service.V;

@AiService
public interface CodeAssistant {

    @SystemMessage("You are a code evaluator. Generate 6 test cases for the problem, evaluate the student's code against each, and return results in the required structure.")
    @UserMessage("""
            Problem: {{problem}}
            Language: {{languageId}}
            Code: {{code}}

            Return ONLY this structure, no extra text:

            aiMessage: (2 sentence feedback)
            testCaseDTOList:
            - testCase: (what is tested)
              predefinedState: (JSON object NOT a string)
              input: {"method": "methodName", "args": {"key": "value"}}
              expectedOutput: (correct result)
              actualOutput: (what code returned)
              status: PASS or FAIL
            """)
    CodeReviewResponseDTO submitCode(
            @V("problemId") long problemId,
            @V("problem") String problemDescription,
            @V("code") String code,
            @V("userId") long userId,
            @V("languageId") String languageId
    );

    String ask(@UserMessage String question);
}