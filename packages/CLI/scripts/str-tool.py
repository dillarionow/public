#name: STR Tool
#description: Calculates string weight
#language: python
#tags: demo, cli
#require: str-tool-linux
#input: dataframe data [Input data table]
#input: column input {type:categorical} [Input column]
#input: bool do_log = false [Use LOG weights]
#output: dataframe output {action:join(data)} [Output data]
#output: string stdout [STDOUT content]
#output: string stderr [STDERR content]

import tempfile
from subprocess import Popen, PIPE

working_dir = tempfile.mkdtemp()

data.to_csv(os.path.join(working_dir, 'input.csv'), index=False)

params = [os.path.join(utils_dir, 'str-tool-linux'), '-i', 'input.csv', '-o', 'output.csv']
if do_log:
    params.append('-l')

process = Popen(params, cwd=working_dir, stdout=PIPE, stderr=PIPE)
stdout, stderr = process.communicate()

if process.returncode == 0:
    output = pd.read_csv(os.path.join(working_dir, 'output.csv'))
