```
- name: tflint
  uses: reviewdog/action-tflint@master
  with:
    github_token: ${{ secrets.github_token }}
    working_directory: ./aws/${{ matrix.env }}
    reporter: github-pr-review
    filter_mode: nofilter
    fail_on_error: true

- name: tfsec
  uses: reviewdog/action-tfsec@v1
  with:
    github_token: ${{ secrets.github_token }}
    working_directory: ./aws/${{ matrix.env }}
    reporter: github-pr-review
    filter_mode: nofilter
    fail_on_error: true

- name: checkov
  id: checkov
  uses: bridgecrewio/checkov-action@master
  with:
    directory: ./aws/${{ matrix.env }}
    skip_check: CKV_AWS_8
    quiet: true # optional: display only failed checks
    framework: terraform
```
